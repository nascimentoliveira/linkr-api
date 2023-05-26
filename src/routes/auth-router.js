import { Router } from "express";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";
import { signUp, signIn } from "../controllers/authController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { signInValid, signUpValid } from "../middlewares/authMiddleware.js";

const auth = Router();

auth
  .post("/signup", validateSchema(signUpSchema), signUpValid, signUp)
  .post("/", validateSchema(signInSchema), signInValid, signIn);

export default auth;
//
