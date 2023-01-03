import { Router } from 'express';

import postsRoute from './posts.routes.js';

const router = Router();

router.use(postsRoute);

export default router;