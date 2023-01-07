import { Router } from 'express';

import validateSchema from '../middlewares/schemaValidator.js';
import postSchema from '../schemas/postSchema.js';
import { tokenValid } from '../middlewares/authMiddleware.js';
import { fetchMetadata, newPost } from '../controllers/postController.js';
import { fetchData } from '../middlewares/postMiddleware.js';

const router = Router();

router.post('/posts', tokenValid, validateSchema(postSchema), newPost);

router.get('/timeline', fetchData, fetchMetadata);

export default router;
