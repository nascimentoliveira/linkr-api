import { Router } from "express";
import { createComment, getComments } from "../controllers/commentsController.js";

const commentsRouter = Router();

commentsRouter.post("/comments", createComment);
commentsRouter.get("/comments", getComments);

export default commentsRouter;