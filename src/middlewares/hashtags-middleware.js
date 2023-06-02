import httpStatus from "http-status";

import hashtagRepository from "../repositories/hashtags-repository.js";

async function hashtagIsValid(req, res, next) {
  const { hashtag } = req.params;
  try {
    const [hashtagId] = (await hashtagRepository.getHashtagId(hashtag)).rows;
    if (!hashtagId) {
      res.status(httpStatus.NOT_FOUND).send({
        error: "Hashtag not registered!",
      });
      return;
    }
    res.locals.hashtagId = hashtagId;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred during hashtag validation. Please try again later.",
    });
    return;
  }
  next();
}

const hashtagsMiddleware = {
  hashtagIsValid,
}

export default hashtagsMiddleware;
//
