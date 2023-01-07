import { Router } from 'express';

import postsRouter from './postsRoute.js';
import authRouter from './authRouter.js';
import likesRouter from './likesRoute.js';
import hashtagRouter from './hashtagRoute.js';

const router = Router();
router.use(authRouter);
router.use(postsRouter);
router.use(likesRouter);
router.use(hashtagRouter);

export default router;
