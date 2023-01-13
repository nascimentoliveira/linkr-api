import urlMetadata from "url-metadata";
import { MESSAGES } from "../constants.js";
import followRepository from "../repositories/followRepository.js";
import postRepository from "../repositories/postRepository.js";

export async function fetchMetadata(req, res, next) {
  const { url } = req.body;
  try {
    const { title, image, description } = await urlMetadata(url);
    const metaUrl = { url, title, image, description };
    res.locals.metaUrl = metaUrl;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}

export async function checkFollow(req, res, next) {
  const follower = res.locals.user.id;
  const followed = req.params.id;
  try {
    const follows = (await followRepository.checkFollow(followed, follower))
      .rows;
    if (follows.length !== 0) {
      res.locals.header = follows;
      res.locals.follows = true;
    } else {
      const header = (await followRepository.getUserData(followed)).rows;
      res.locals.header = header;
      res.locals.follows = false;
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}

export async function getFollowed(req, res, next) {
  const { id } = res.locals.user;
  try {
    const { rows } = await followRepository.checkMyFollwed(id);
    if (rows.length === 0) {
      res.locals.follows = false;
    } else {
      res.locals.follows = true;
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}

export async function postIdValid(req, res, next) {

  const { id } = req.params;

  try {
    const [post] = (await postRepository.getPostById(id)).rows;

    if (!post) {
      res.status(404).send({ message: 'Unregistered post!' });
      return;
    }

    res.locals.post = post;

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export async function checkUserOwner(req, res, next) {

  const { userId } = res.locals.post;
  const { id } = res.locals.user;

  if (userId !== id) {
    res.status(401).send({ message: 'Operation not allowed!' });
    return;
  }

  next();
}