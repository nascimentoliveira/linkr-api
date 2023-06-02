import { Router } from "express";

import commentSchema from "../models/comments-model.js";
import validateSchema from "../middlewares/schemaValidator.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import postsMiddleware from "../middlewares/posts-middleware.js";
import commentsController from "../controllers/comments-controller.js";

const comments = Router();

comments
  .all("/*", authMiddleware.tokenValid)
  .post("/:postId", validateSchema(commentSchema), postsMiddleware.postIdValid, commentsController.createComment);

export default comments;
//
