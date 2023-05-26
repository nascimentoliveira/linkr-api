import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

import {
  checkFollow,
  fetchMetadata,
  getFollowed,
  postIdValid,
  checkUserOwner
} from "../middlewares/postMiddleware.js";

import {
  fetchUserData,
  fetchData,
  newPost,
  deletePost,
  editPost,
} from "../controllers/postController.js";


const posts = Router();

posts
  .all("/*", tokenValid)
  .post("/", validateSchema(postSchema), fetchMetadata, newPost)
  .get("/", getFollowed, fetchData)
  .put("/:id", editPost)
  .delete("/:id", postIdValid, checkUserOwner, deletePost)
  .get("/user/:id", checkFollow, fetchUserData);

export default posts;
//
