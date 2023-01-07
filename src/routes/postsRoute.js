import { Router } from "express";

import validateSchema from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";
import { fetchData, fetchUserData } from "../middlewares/postMiddleware.js";
import { tokenValid } from "../middlewares/authMiddleware.js";
import { fetchMetadata, newPost } from "../controllers/postController.js";

const router = Router();

router.post("/posts", tokenValid, validateSchema(postSchema), newPost);

router.get("/timeline", fetchData, fetchMetadata);

router.get("/user/:id", fetchUserData, fetchMetadata);

export default router;
