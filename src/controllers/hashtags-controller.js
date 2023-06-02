import httpStatus from "http-status";

import hashtagsRepository from "../repositories/hashtags-repository.js";

async function hashtagsTrending(req, res) {
  try {
    const hashtagsTrending = (await hashtagsRepository.getHashtagsTrending()).rows;
    res.status(httpStatus.OK).send(hashtagsTrending);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while fetching trending hashtags. Please try again later.",
    });
  }
  return;
}

async function hashtagPosts(req, res) {
  const { id } = res.locals.hashtagId;
  const page = req.query.page;
  const offset = req.query.offset;
  try {
    const hashtagPosts = (await hashtagsRepository.getHashtagPosts(id, page, offset)).rows;
    if (hashtagPosts.length === 0) {
      res.status(httpStatus.OK).send({
        posts: hashtagPosts,
      });
      return;
    }
    res.status(httpStatus.OK).send({
      posts: hashtagPosts,
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while fetching posts with the hashtag. Please try again later.",
    });
  }
  return;
}

const hashtagsController = {
  hashtagsTrending,
  hashtagPosts,
}

export default hashtagsController;
//
