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
    const { rows } = await followRepository.checkFollow(followed, follower);
    const follows = rows.length !== 0;
    if (follows) {
      res.locals.follows = true;
    } else {
      res.locals.follows = false;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}
