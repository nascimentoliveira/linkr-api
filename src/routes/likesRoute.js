import {Router} from "express";

import { likePost, dislikePost, countLikes, getLikes } from "../controllers/likesControlles.js";

const likesRouter = Router();
likesRouter.post("/likes/:id", likePost);
likesRouter.delete("/dislikes/:id", dislikePost);
likesRouter.get("/likes/count/:id", countLikes);
likesRouter.get("/likes", getLikes);


export default likesRouter;
