import { Router } from "express";

import postsRouter from "./postsRoute.js";
import authRouter from "./authRouter.js";
import likesRouter from "./likesRoute.js";

const router = Router();

router.use(postsRouter, authRouter);
router.use(likesRouter);

export default router;
