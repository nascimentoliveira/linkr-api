import { Router } from "express";

import postSchema from "../models/posts-model.js";
import validateSchema from "../middlewares/schemaValidator.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import postsMiddleware from "../middlewares/posts-middleware.js";
import usersMiddleware from "../middlewares/users-middleware.js";
import postsController from "../controllers/posts-controller.js";

const posts = Router();

posts
  .all("/*", authMiddleware.tokenValid)
  .post("/", validateSchema(postSchema), postsMiddleware.getMetadata, postsController.createPost)
  .get("/", postsMiddleware.getFollowedUsers, postsController.getPosts)
  .get("/users/:userId", usersMiddleware.userIdParamValid, postsMiddleware.checkFollow, postsController.getUserPosts)
  .put("/:postId", postsMiddleware.postIdValid, postsMiddleware.checkIsOwner, postsController.editPost)
  .delete("/:postId", postsMiddleware.postIdValid, postsMiddleware.checkIsOwner, postsController.deletePost);

export default posts;
//
