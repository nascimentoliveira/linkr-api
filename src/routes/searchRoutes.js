import { Router } from "express";
import searchUsers from "../controllers/searchController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import searchSchema from "../schemas/searchSchema.js";

const searchRouter = Router();

searchRouter.post("/search", validateSchema(searchSchema),searchUsers)

export default searchRouter;

