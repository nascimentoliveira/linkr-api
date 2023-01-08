import {Router} from "express";

import { likePost, dislikePost, countLikes, getLikes, getLikesId } from "../controllers/likesControlles.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

const likesRouter = Router();
likesRouter.post("/likes/:id", tokenValid, likePost);
likesRouter.delete("/dislikes/:id", tokenValid, dislikePost);
likesRouter.get("/likes/count/:id", countLikes);
likesRouter.get("/likes", getLikes);
likesRouter.get("/likes/:id", getLikesId);


export default likesRouter;
