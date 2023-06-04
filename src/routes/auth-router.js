import { Router } from "express";

import authSchema from "../models/auth-model.js";
import validateSchema from "../middlewares/schemaValidator.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import authController from "../controllers/auth-controller.js";

const auth = Router();

auth
  .post("/", validateSchema(authSchema), authMiddleware.authValid, authController.login);

export default auth;
/**
 * @swagger
 * paths:
 *   /api/auth:
 *     post:
 *       summary: User login.
 *       tags:
 *         - Authentication
 *       description: This route is responsible for authenticating users in the application. It allows users to log in by providing their email and password.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john.doe@example.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: password123
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         '200':
 *           description: User logged in successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   username:
 *                     type: string
 *                     example: John Doe
 *                   picture:
 *                     type: string
 *                     example: https://www.image-profile-url.com/user-image-profile
 *                   token:
 *                     type: string
 *                     example: ef9e3e32-e9c0-4bfe-a407-027b45efd990
 *         '401':
 *           description: User not registered or invalid password.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: User not registered or invalid password!
 *         '422':
 *           description: Invalid or incomplete data.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Body is not in the expected format!
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: string
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: An internal server error occurred. Please try again later.
 */
//
