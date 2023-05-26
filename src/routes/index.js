import { Router } from "express";

import posts from "./posts-route.js";
import auth from "./auth-router.js";
import likes from "./likes-route.js";
import hashtag from "./hashtag-route.js";
import search from "./search-route.js";
import follow from "./follow-route.js";
import comments from "./comments-route.js";

const api = Router();
api
  .use(auth)
  .use(posts)
  .use(likes)
  .use(hashtag)
  .use(search)
  .use(follow)
  .use(comments);

export default api;
//
