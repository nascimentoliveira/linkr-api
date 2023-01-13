import { Router } from "express";
import { createComment, getComments } from "../controllers/commentsController.js";

const commentsRouter = Router();

commentsRouter.post("/comments/:postId", createComment);
commentsRouter.get("/comments/:postId", getComments);

export default commentsRouter;