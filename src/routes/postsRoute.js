import { Router } from "express";

import validateSchema from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";
import {
  fetchMetadata,
  newPost,
} from "../controllers/postController.js";
import { fetchData,fetchUserData } from "../middlewares/postMiddleware.js";

const router = Router();

router.post("/posts", validateSchema(postSchema), newPost);

router.get("/timeline", fetchData, fetchMetadata);

router.get("/user/:id", fetchUserData,fetchMetadata);

export default router;
