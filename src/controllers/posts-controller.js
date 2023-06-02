import httpStatus from "http-status";

import postsRepository from "../repositories/posts-repository.js";
import hashtagsRepository from "../repositories/hashtags-repository.js";

async function createPost(req, res) {
  const userId = res.locals.user.id;
  const { url, text } = req.body;
  const { title, image, description } = res.locals.metadataUrl;
  const finalText = (text !== undefined) ? text : "";
  try {
    const [urlId] = (await postsRepository.insertUrl(url, title, image, description)).rows
    const [postId] = (await postsRepository.createPost(userId, urlId.id, finalText)).rows;
    const hashtags = (text || "").match(/#\w+/g)?.map(x => x.substr(1));
    if (hashtags) {
      const [hashtagsIds] = (await hashtagsRepository.insertHashtags(hashtags)).rows;
      await hashtagsRepository.registerPostHashtags(postId.id, hashtagsIds.ids);
    }
    res.status(httpStatus.CREATED).send({
      message: "Link published successfully!",
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error has occurred while creating your post. Please try again later.",
    });
  }
}

async function deletePost(req, res) {
  const postId = res.locals.post.id
  try {
    await postsRepository.deletePost(postId);
    res.status(httpStatus.OK).send({
      message: "Post deleted!",
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while deleting your post. Please try again later.",
    });
  }
}

async function editPost(req, res) {
  const postId = res.locals.post.id;
  const { text } = req.body;
  try {
    const [newText] = (await postsRepository.editPost(text, postId)).rows;
    res.status(httpStatus.OK).send({
      newText,
      message: "Post edited!"
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while editing your post. Please try again later.",
    });
  }
}

async function getPosts(req, res) {
  const userId = res.locals.user.id;
  const followedUsers = res.locals.followedUsers;
  const offset = req.query.offset;
  const more = req.query.more;
  const lastRefresh = req.query.lastRefresh;
  try {
    let posts;
    if (lastRefresh) {
      posts = (await postsRepository.getMorePosts(userId, lastRefresh)).rows;
    } else {
      posts = (await postsRepository.getPosts(userId, offset, more)).rows;
    }
    res.status(httpStatus.OK).send({
      follow: followedUsers,
      posts,
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while fetching posts. Please try again later.",
    });
  }
}

async function getUserPosts(req, res) {
  const userId = res.locals.user.id;
  const userParam = res.locals.userParam;
  const more = req.query.more;
  const offset = req.query.offset;
  try {
    const posts = (await postsRepository.getUserPosts(userId, userParam.id, offset, more)).rows;
    res.status(httpStatus.OK).send({
      header: {
        ...userParam,
        follows: (res.locals.follows && res.locals.follows.length > 0),
      },
      posts: posts,
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while fetching this user's posts. Please try again later.",
    });
  }
  return
}

const postsController = {
  createPost,
  deletePost,
  editPost,
  getPosts,
  getUserPosts,
}

export default postsController;
//
