import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import posts from "./posts-router.js";
import auth from "./auth-router.js";
import likes from "./likes-router.js";
import hashtags from "./hashtags-router.js";
import search from "./search-router.js";
import followers from "./followers-router.js";
import comments from "./comments-router.js";
import health from "./health-router.js";
import swaggerSpec from "../docs.js";

const api = Router();
api
  .use("/", health)
  .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use("/auth", auth)
  .use("/posts", posts)
  .use("/likes", likes)
  .use("/hashtags", hashtags)
  .use("/search", search)
  .use("/followers", followers)
  .use("/comments", comments);

export default api;
//
