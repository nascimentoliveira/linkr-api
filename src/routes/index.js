import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "../docs.js";
import health from "./health-router.js";
import auth from "./auth-router.js";
import users from "./users-router.js";
import posts from "./posts-router.js";
import hashtags from "./hashtags-router.js";
import likes from "./likes-router.js";
import followers from "./followers-router.js";
import comments from "./comments-router.js";

const api = Router();
api
  .use("/", health)
  .use("/health", health)
  .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use("/auth", auth)
  .use("/users", users)
  .use("/posts", posts)
  .use("/hashtags", hashtags)
  .use("/likes", likes)
  .use("/followers", followers)
  .use("/comments", comments);

export default api;
//
