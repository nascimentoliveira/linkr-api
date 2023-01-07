import { Router } from 'express';

import { tokenValid } from '../middlewares/authMiddleware.js';
import { topHashtag } from '../controllers/hashtagsController.js';

const router = Router();

router.get('/hashtag', tokenValid, topHashtag)
router.get('/hashtag/:hashtag', tokenValid)

export default router;