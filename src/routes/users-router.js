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
/**
 * @swagger
 * paths:
 *   /api/users:
 *     post:
 *       summary: Register a new user.
 *       tags:
 *         - Users
 *       description: This route is responsible for registering users in the application. It allows users to use the platform by providing their email, password, username, and profile picture URL.
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
 *                 username:
 *                   type: string
 *                   example: John Doe
 *                 picture:
 *                   type: string
 *                   example: https://www.image-profile-url.com/user-image-profile
 *               required:
 *                 - email
 *                 - password
 *                 - username
 *                 - picture
 *       responses:
 *         '201':
 *           description: User successfully registered.
 *           content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: User successfully created!
 *         '409':
 *           description: Invalid data for user registration.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: E-mail already registered!
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
 *                       oneOf:
 *                         - type: string
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                    type: string
 *                    example: An internal server error occurred. Please try again later.
 */

/**
 * @swagger
 * paths:
 *   /api/users/search:
 *     get:
 *       summary: Search users by username.
 *       parameters:
 *        - in: query
 *          name: username
 *          schema:
 *            type: string
 *          required: true
 *          description: The username or part of the username to be used for searching users.
 *       security:
 *       - bearerAuth: []
 *       tags:
 *         - Users
 *       description: Returns a list of users based on a username or part of it.
 *       responses:
 *         '200':
 *           description: List of users found successfully.
 *           content:
 *            application/json:
 *               schema:
 *                 oneOf:
 *                   - UserList:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                         username:
 *                           type: string
 *                           example: John Doe
 *                         picture:
 *                           type: string
 *                           format: uri
 *                           example: https://www.image-profile-url.com/user-image-profile
 *                   - EmptyUserList:
 *                     type: array
 *                     items:
 *                       type: string
 *         '400':
 *           description: Invalid or missing parameters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                    type: string
 *                    example: The 'username' parameter is mandatory and must be provided in the query with at least 3 characters.
 *         '401':
 *           description: Missing access token.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Unexpected header format! Field 'Authorization' not found.
 *         '403':
 *           description: Operation not allowed.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Invalid or expired token, please sign in to your account!
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                    type: string
 *                    example: An internal server error occurred. Please try again later.
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token missing or invalid.
 */
//
