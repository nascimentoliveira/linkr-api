import { Router } from "express";

import authMiddleware from "../middlewares/auth-middleware.js";
import postsMiddleware from "../middlewares/posts-middleware.js";
import likesMiddleware from "../middlewares/likes-middleware.js";
import likesController from "../controllers/likes-controller.js";

const likes = Router();

likes
  .all("/*", authMiddleware.tokenValid)
  .post("/:postId", postsMiddleware.postIdValid, likesMiddleware.checkLiked, likesController.like)
  .delete("/:postId", postsMiddleware.postIdValid, likesMiddleware.checkLiked, likesController.unlike);

export default likes;
//
