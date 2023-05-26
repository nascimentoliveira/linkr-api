import { Router } from "express";
import { follow, unfollow } from "../controllers/followController.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

const followers = Router();

followers
  .all("/*", tokenValid)
  .get("/:id", follow)
  .delete("/:id", unfollow);

export default followers;
//
