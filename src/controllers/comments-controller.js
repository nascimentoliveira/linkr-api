import httpStatus from "http-status";

import commentsRepository from "../repositories/comments-repository.js";

async function createComment(req, res) {
  const { userId, comment } = req.body
  const postId = res.locals.post.id;
  try {
    const comments = (await commentsRepository.createComment(postId, userId, comment)).rows;
    res.status(httpStatus.CREATED).send({
      comments: comments,
      message: "Comment created!",
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while the comment was being created. Please try again later.",
    });
  }
  return;
}

const commentsController = {
  createComment,
}

export default commentsController;
//
