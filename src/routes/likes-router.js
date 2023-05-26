import { Router } from "express";

import { likePost, dislikePost, countLikes, getLikes, getLikesId } from "../controllers/likesControlles.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

const likes = Router();

likes
  .all("/*", tokenValid)
  .get("/count/:id", countLikes)
  .get("/:id", getLikesId)
  .get("/", getLikes)
  .post("/:id", likePost)
  .delete("/:id", dislikePost);

export default likes;
//
