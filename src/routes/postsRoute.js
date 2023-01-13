import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidator.js';
import postSchema from '../schemas/postSchema.js';
import { tokenValid } from '../middlewares/authMiddleware.js';

import { 
  checkFollow, 
  fetchMetadata, 
  getFollowed, 
  postIdValid, 
  checkUserOwner 
} from '../middlewares/postMiddleware.js';

import {
  fetchUserData,
  fetchData,
  newPost,
  deletePost,
  editPost,
} from '../controllers/postController.js';


const postRouter = Router();

postRouter.post(
  '/posts',
  tokenValid,
  validateSchema(postSchema),
  fetchMetadata,
  newPost
);

postRouter.get(
  '/timeline', 
  tokenValid, 
  getFollowed, 
  fetchData
);

postRouter.get(
  '/user/:id', 
  tokenValid, 
  checkFollow, 
  fetchUserData
);

postRouter.delete(
  '/deletepost/:id', 
  tokenValid, 
  postIdValid, 
  checkUserOwner, 
  deletePost
);

postRouter.put(
  '/editpost/:id', 
  tokenValid, 
  editPost
);

export default postRouter;
