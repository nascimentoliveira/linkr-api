import {Router} from "express";

import { likePost, dislikePost, countLikes } from "../controllers/likesControlles.js";

const likesRouter = Router();
likesRouter.post("/likes", likePost);
likesRouter.delete("/likes/:id", dislikePost);
likesRouter.get("/likes/count", countLikes);


export default likesRouter;
