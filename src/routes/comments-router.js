import { Router } from "express";
import { createComment, getComments } from "../controllers/commentsController.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

const comments = Router();

comments
  .all("/*", tokenValid)
  .post("/", createComment)
  .get("/", getComments);

export default comments;
//
