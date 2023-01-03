import { Router } from 'express';

import postsRoutes from './postsRoute.js';

const router = Router();

router.use(postsRoutes);

export default router;