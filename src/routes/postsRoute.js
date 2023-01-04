import { Router } from 'express';

import validateSchema from '../middlewares/schemaValidator.js';
import postSchema from '../schemas/postSchema.js';
import { newPost,fetchTimelineData } from '../controllers/postController.js';

const router = Router();

router.post(
  '/posts',
  validateSchema(postSchema),
  newPost
);

router.get('/timeline',fetchTimelineData)

export default router;