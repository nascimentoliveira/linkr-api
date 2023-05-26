import { Router } from "express";
import { tokenValid } from "../middlewares/authMiddleware.js";
import { topHashtag, hashtagPosts } from "../controllers/hashtagsController.js";
import { hashtagValid } from "../middlewares/hashtagMiddleware.js";

const hashtags = Router();

hashtags
  .all("/*", tokenValid)
  .get("/", tokenValid, topHashtag)
  .get("/:hashtag", tokenValid, hashtagValid, hashtagPosts);

export default hashtags;
//
