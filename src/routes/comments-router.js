import { Router } from "express";

import commentSchema from "../models/comments-model.js";
import validateSchema from "../middlewares/schemaValidator.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import postsMiddleware from "../middlewares/posts-middleware.js";
import commentsController from "../controllers/comments-controller.js";

const comments = Router();

comments
  .all("/*", authMiddleware.tokenValid)
  .post("/:postId", validateSchema(commentSchema), postsMiddleware.postIdValid, commentsController.createComment);

export default comments;
/**
 * @swagger
 * paths:
 *   /api/comments/{postId}:
 *     post:
 *       summary: Register a comment on the post with the specified ID.
 *       tags:
 *         - Comments
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: postId
 *           in: path
 *           description: The ID of the post where the comment will be registered.
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: string
 *                   example: comment for the post
 *               required:
 *                 - comment
 *       responses:
 *         '200':
 *           description: Comment successfully registered.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         username:
 *                           type: string
 *                         picture:
 *                           type: string
 *                           format: uri
 *                         userId:
 *                           type: integer
 *                         comment:
 *                           type: string
 *                         isAuthor:
 *                           type: boolean
 *                         follows:
 *                           type: boolean
 *                   message:
 *                     type: string
 *                     example: "Comment created!"
 *         '400':
 *           description: Invalid or missing parameters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: The 'postId' parameter is mandatory and must be provided.
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
 *                     example: Invalid or expired token. Please log into your account again!
 *         '404':
 *           description: Post with the specified ID not found.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: The post specified in the parameter was not found!
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Missing or invalid access token.
 */
//
