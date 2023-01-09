import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";
import { fetchData, fetchUserData } from "../middlewares/postMiddleware.js";
import { fetchMetadata, newPost, deletePost, editPost } from "../controllers/postController.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

const postRouter = Router();

postRouter.post("/posts", tokenValid, validateSchema(postSchema), newPost);

postRouter.get("/timeline", tokenValid ,fetchData, fetchMetadata);

postRouter.get("/user/:id", tokenValid,fetchUserData, fetchMetadata);

postRouter.delete("/deletepost/:id", tokenValid, deletePost);

postRouter.put("/editpost/:id", tokenValid, editPost);


export default postRouter;
