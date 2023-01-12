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
  const user = res.locals.user;
  const { id } = req.params;
  const userId = user.id;
  const postId = id;
  console.log(userId, id);
  try {
    if (!postId) {
      return res.sendStatus(400);
    }
    await postRepository.deletePost(userId, id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
    console.log(error);
    res.sendStatus(500);
  }
}

export async function fetchData(req, res) {
  const { id } = res.locals.user;
  const page = req.query.page;
  const offset = req.query.offset;
  try {
    const { rows } = await postRepository.fetchData(id, page, offset);
    if (rows.length === 0) {
      res.status(200).send({ message: "There are no posts yet" });
      return;
    }
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}

export async function fetchUserData(req, res, next) {
  const { id } = req.params;
  const { follows } = res.locals;
  const page = req.query.page;
  const offset = req.query.offset;  
  try {
    const { rows } = await postRepository.fetchUserData(id, page, offset);
    if (rows.length === 0) {
      res.status(200).send({ message: "There are no posts yet" });
      return;
    }
    res.status(200).send({ posts: rows, follows });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}
