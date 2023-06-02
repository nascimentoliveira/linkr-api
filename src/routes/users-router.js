import { Router } from "express";

import validateSchema from "../middlewares/schemaValidator.js";
import usersSchema from "../models/users-model.js";
import usersMiddleware from "../middlewares/users-middleware.js";
import usersController from "../controllers/users-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const users = Router();

users
  .post("/", validateSchema(usersSchema), usersMiddleware.emailIsValid, usersController.createUser)
  .get("/search", authMiddleware.tokenValid, usersController.searchUsers);

export default users;
//
