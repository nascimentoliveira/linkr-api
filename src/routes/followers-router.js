import { Router } from "express";

import authMiddleware from "../middlewares/auth-middleware.js";
import usersMiddleware from "../middlewares/users-middleware.js";
import followersController from "../controllers/followers-controller.js";

const followers = Router();

followers
  .all("/*", authMiddleware.tokenValid)
  .post("/:userId", usersMiddleware.userIdParamValid, followersController.follow)
  .delete("/:userId", usersMiddleware.userIdParamValid, followersController.unfollow);

export default followers;
//
//TODO: can't follow yourself
//TODO: can't follow who already follows