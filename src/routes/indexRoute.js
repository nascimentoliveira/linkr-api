import { Router } from 'express';

import postsRoutes from './postsRoute.js';
import likesRouter from './likesRoute.js';

const router = Router();

router.use(postsRoutes);
router.use(likesRouter);

export default router;