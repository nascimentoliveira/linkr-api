import { Router } from "express";

import postsRoutes from "./postsRoute.js";
import authRouter from "./authRouter.js";
import likesRouter from "./likesRoute.js";

const router = Router();

router.use(postsRoutes, authRouter);
router.use(likesRouter);

export default router;
