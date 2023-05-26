import { Router } from "express";
import { tokenValid } from "../middlewares/authMiddleware.js";
import { topHashtag, hashtagPosts } from "../controllers/hashtagsController.js";
import { hashtagValid } from "../middlewares/hashtagMiddleware.js";

const hashtags = Router();

hashtags
  .all("/*", tokenValid)
  .get("/", topHashtag)
  .get("/:hashtag", hashtagValid, hashtagPosts);

export default hashtags;
//
