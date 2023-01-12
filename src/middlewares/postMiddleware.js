import urlMetadata from "url-metadata";
import { MESSAGES } from "../constants.js";
import followRepository from "../repositories/followRepository.js";

export async function fetchMetadata(req, res, next) {
  const { url } = req.body;
  try {
    const { title, image, description } = await urlMetadata(url);
    const metaUrl = { url, title, image, description };
    res.locals.metaUrl = metaUrl;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}

export async function checkFollow(req, res, next) {
  const follower = res.locals.user.id;
  const followed = req.params.id;
  try {
    const follows = (await followRepository.checkFollow(followed, follower)).rows;
    if (follows.length !== 0) {
      res.locals.header = follows
      res.locals.follows = true;
    } else {
      const header = (await followRepository.getUserData(followed)).rows
      res.locals.header = header;
      res.locals.follows = false;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}
