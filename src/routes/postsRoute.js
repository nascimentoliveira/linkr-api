import { Router } from 'express';

import validateSchema from '../middlewares/schemaValidator.js';
import postSchema from '../schemas/postSchema.js';
import { newPost } from '../controllers/postController.js';

const router = Router();

router.post(
  '/posts',
  validateSchema(postSchema),
  newPost
);

export default router;