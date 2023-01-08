import { Router } from 'express';

import { tokenValid } from '../middlewares/authMiddleware.js';
import { topHashtag, hashtagPosts } from '../controllers/hashtagsController.js';
import { hashtagValid } from '../middlewares/hashtagMiddleware.js';

const router = Router();

router.get('/hashtag', tokenValid, topHashtag)
router.get('/hashtag/:hashtag', tokenValid, hashtagValid, hashtagPosts)

export default router;