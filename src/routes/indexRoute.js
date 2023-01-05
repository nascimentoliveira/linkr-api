import { Router } from 'express';

import postsRoutes from './postsRoute.js';
import authRouter from './authRouter.js'


const router = Router();

router.use(postsRoutes, authRouter);

export default router;