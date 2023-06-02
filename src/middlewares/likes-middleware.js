import httpStatus from "http-status";

import likesRepository from "../repositories/likes-repository.js";

async function checkLiked(req, res, next) {
  const userId = res.locals.user.id;
  const { postId } = req.params;
  try {
    const [like] = (await likesRepository.checkLiked(userId, postId)).rows;
    if (req.method === "POST" && like) {
      res.status(httpStatus.OK).send({
        message: "Post already liked!",
      });
    } else if ((req.method === "DELETE" && !like))
      res.status(httpStatus.OK).send({
        message: "Post already unliked!",
      });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while checking if the post has already been liked. Please try again later.",
    });
    return;
  }
  next();
}

const likesMiddleware = {
  checkLiked,
}

export default likesMiddleware;
//
