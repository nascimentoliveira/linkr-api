import { Router } from "express";
import { createComment, getComments } from "../controllers/commentsController.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

const commentsRouter = Router();

commentsRouter.post("/comments",tokenValid,createComment);
commentsRouter.get("/comments", tokenValid,getComments);

export default commentsRouter;