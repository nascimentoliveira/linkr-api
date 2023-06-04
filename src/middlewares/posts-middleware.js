import urlMetadata from "url-metadata";
import httpStatus from "http-status";

import followersRepository from "../repositories/followers-repository.js";
import postsRepository from "../repositories/posts-repository.js";

async function getMetadata(req, res, next) {
  const { url } = req.body;
  try {
    const { title, image, description } = await urlMetadata(url);
    const finalImage = image.startsWith("https://") ? image :
      (image.startsWith("/") && url.endsWith("/")) ? url + image.substring(1) : url + image;
    res.locals.metadataUrl = { title, image: finalImage, description };
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while fetching link metadata. Please Please try again later.",
    });
    return;
  }
  next();
}

async function checkFollow(_, res, next) {
  const followerId = res.locals.user.id;
  const followedId = res.locals.userParam.id;
  try {
    const follows = ((await followersRepository.checkFollows(followedId, followerId)).rowCount > 0);
    res.locals.follows = follows;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while querying whether you follow the user. Please Please try again later.",
    });
    return;
  }
  next();
}

async function getFollowedUsers(_, res, next) {
  const userId = res.locals.user.id;
  try {
    const followedUsers = ((await followersRepository.getFollowedUsers(userId)).rowCount > 0);
    res.locals.followedUsers = followedUsers;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while fetching followed users. Please try again later.",
    });
    return;
  }
  next();
}

async function postIdValid(req, res, next) {
  const { postId } = req.params;
  try {
    if (!postId) {
      res.status(httpStatus.BAD_REQUEST).send({
        error: "The 'postId' parameter is mandatory and must be provided.",
      });
      return;
    }
    const [post] = (await postsRepository.getPostById(postId)).rows;
    if (!post) {
      res.status(httpStatus.NOT_FOUND).send({
        error: "The post specified in the parameter was not found!",
      });
      return;
    }
    res.locals.post = post;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while validating the parameter. Please try again later.",
    });
    return;
  }
  next();
}

async function checkIsOwner(_, res, next) {
  const userId = res.locals.post.userId;
  const id = res.locals.user.id;
  if (userId !== id) {
    res.status(httpStatus.FORBIDDEN).send({
      error: "Operation not allowed. You are not the owner of this post!",
    });
    return;
  } 
  next();
}

const postsMiddleware = {
  getMetadata,
  checkFollow,
  getFollowedUsers,
  postIdValid,
  checkIsOwner,
}

export default postsMiddleware;
//
