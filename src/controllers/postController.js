import postRepository from "../repositories/postRepository.js";
import { handleHashtags } from "./hashtagsController.js";
import { MESSAGES } from "../constants.js";

export async function newPost(req, res) {
  const { text } = req.body;
  const { user, metaUrl } = res.locals;
  const { url, title, image, description } = metaUrl;
  try {
    const urlRegistered =
      (await postRepository.insertUrl(url, title, image, description))
        .rows[0] ||
      (await postRepository.getUrlId(url, title, image, description)).rows[0];
    const [post] = (
      await postRepository.createPost(user.id, urlRegistered.id, text || "")
    ).rows;
    handleHashtags(text || "", post.id);
    res.status(201).send({ message: "Link published successfully!" });
  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res
      .status(500)
      .send({ message: "There was an error publishing your link!" });
  }
}

export async function deletePost(req, res) {
  const { id } = res.locals.post

  try {
    await postRepository.deletePost(id);
    res.status(200).send({ message: 'Post deleted!' });

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: 'An error has ocurred, unable to delete the post...' });
  }
}

export async function editPost(req, res) {
  const user = res.locals.user;
  const { id } = req.params;
  const { text } = req.body;
  const userId = user.id;
  try {
    await postRepository.editPost(text, userId, id);
    res.status(200).send(text);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function fetchData(req, res) {
  const { id } = res.locals.user;
  const offset = req.query.offset;
  const more = req.query.more;
  const lastRefresh = req.query.lastRefresh;

  const { follows } = res.locals;
  try {
    const { rows } = lastRefresh
      ? await postRepository.fetchNewPosts(id, lastRefresh)
      : await postRepository.fetchData(id, offset, more);

    if (rows.length === 0 && follows) {
      res
        .status(200)
        .send({ posts: rows, message: "No posts found from your friends" });
      return;
    }
    if (rows.length === 0 && !follows) {
      res
        .status(200)
        .send({
          posts: rows,
          message: "You don't follow anyone yet. Search for new friends!",
        });
      return;
    }
    res.status(200).send({ posts: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}

export async function fetchUserData(req, res, next) {
  const { id } = req.params;
  const page = req.query.page;
  const offset = req.query.offset;
  const { follows, header } = res.locals;
  const { username, picture } = header[0];

  try {
    const { rows } = await postRepository.fetchUserData(id, page, offset);
    if (rows.length === 0)
      return res
        .status(200)
        .send({
          posts: rows,
          header: { username, picture, follows, id },
          message: "There are no posts yet",
        });
    res
      .status(200)
      .send({ posts: rows, header: { username, picture, follows, id } });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}
