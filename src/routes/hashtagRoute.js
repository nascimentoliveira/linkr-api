import { Router } from 'express';

import { tokenValid } from '../middlewares/authMiddleware.js';
import { topHashtag } from '../controllers/hashtagsController.js';
import { hashtagPosts, hashtagValid } from '../middlewares/hashtagMiddleware.js';
import { fetchMetadata } from '../controllers/postController.js';

const router = Router();

router.get('/hashtag', tokenValid, topHashtag)
router.get('/hashtag/:hashtag', tokenValid, hashtagValid, hashtagPosts, fetchMetadata)

export default router;