import {Router} from "express";

import { likePost, dislikePost, countLikes } from "../controllers/likesControlles.js";

const likesRouter = Router();
likesRouter.post("/likes/:id", likePost);
likesRouter.delete("/dislikes/:id", dislikePost);
likesRouter.get("/likes/count/:id", countLikes);


export default likesRouter;
