import httpStatus from "http-status";

import followersRepository from "../repositories/followers-repository.js";

async function follow(_, res) {
  const followerId = res.locals.user.id;
  const followedId = res.locals.userParam.id;
  try {
    await followersRepository.follow(followedId, followerId);
    res.status(httpStatus.OK).send({
      message: "Following!",
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while subscribing a follower. Please try again later.",
    });
  }
  return;
}

async function unfollow(_, res) {
  const followerId = res.locals.user.id;
  const followedId = res.locals.userParam.id;
  try {
    await followersRepository.unfollow(followedId, followerId);
    res.status(httpStatus.OK).send({
      message: "Unfollowing!",
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while unsubscribing a follower. Please try again later.",
    });
  }
  return;
}

const followersController = {
  follow,
  unfollow,
}

export default followersController;
//
