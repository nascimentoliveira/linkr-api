import urlMetadata from "url-metadata";
import { MESSAGES } from "../constants.js";


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


