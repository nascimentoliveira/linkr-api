import { Router } from "express";
import { checkSearchFollows, searchUsers } from "../controllers/searchController.js";
import { tokenValid } from "../middlewares/authMiddleware.js";
import validateSchema from "../middlewares/schemaValidator.js";
import searchSchema from "../schemas/searchSchema.js";

const search = Router();

search
  .all("/*", tokenValid)
  .post("/", validateSchema(searchSchema), searchUsers, checkSearchFollows);

export default search;
//
