import httpStatus from "http-status";

import likesRepository from "../repositories/likes-repository.js";

async function like(req, res) {
  const userId = res.locals.user.id;
  const postId = res.locals.post.id;
  try {
    await likesRepository.like(userId, postId);
    const [like] = (await likesRepository.getLikes(userId, postId)).rows;
    res.status(httpStatus.OK).send({
      ...like,
      message: "Liked!",
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while trying to like a post. Please try again later.",
    });
  }
}

async function unlike(req, res) {
  const userId = res.locals.user.id;
  const postId = res.locals.post.id;
  try {
    await likesRepository.unlike(userId, postId);
    const [like] = (await likesRepository.getLikes(userId, postId)).rows;
    res.status(httpStatus.OK).send({
      ...like,
      message: "Unliked!",
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while trying to dislike the post. Try later.",
    });
  }
  return;
}

const likesController = {
  like,
  unlike,
}

export default likesController;
//
