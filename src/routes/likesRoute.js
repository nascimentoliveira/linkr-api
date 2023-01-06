import {Router} from "express";

import { likePost, dislikePost, countLikes, getLikes, getLikesId } from "../controllers/likesControlles.js";

const likesRouter = Router();
likesRouter.post("/likes/:id", likePost);
likesRouter.delete("/dislikes/:id", dislikePost);
likesRouter.get("/likes/count/:id", countLikes);
likesRouter.get("/likes", getLikes);
likesRouter.get("/likes/:id", getLikesId);


export default likesRouter;
