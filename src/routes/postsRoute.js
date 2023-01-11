import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";
import {checkFollow, fetchMetadata } from "../middlewares/postMiddleware.js";
import { fetchUserData ,fetchData, newPost, deletePost, editPost } from "../controllers/postController.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

const postRouter = Router();

postRouter.post("/posts", tokenValid, validateSchema(postSchema), fetchMetadata , newPost);

postRouter.get("/timeline", tokenValid , fetchData);

postRouter.get("/user/:id", tokenValid, checkFollow, fetchUserData);

postRouter.delete("/deletepost/:id", tokenValid, deletePost);

postRouter.put("/editpost/:id", tokenValid, editPost);


export default postRouter;
