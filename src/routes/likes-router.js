import { Router } from "express";

import authMiddleware from "../middlewares/auth-middleware.js";
import postsMiddleware from "../middlewares/posts-middleware.js";
import likesMiddleware from "../middlewares/likes-middleware.js";
import likesController from "../controllers/likes-controller.js";

const likes = Router();

likes
  .all("/*", authMiddleware.tokenValid)
  .post("/:postId", postsMiddleware.postIdValid, likesMiddleware.checkLiked, likesController.like)
  .delete("/:postId", postsMiddleware.postIdValid, likesMiddleware.checkLiked, likesController.unlike);

export default likes;
/**
 * @swagger
 * paths:
 *   /api/likes/{postId}:
 *     post:
 *       summary: Register a like on the post with the specified ID.
 *       tags:
 *         - Likes
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: postId
 *           in: path
 *           description: The ID of the post where the like will be registered.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Like successfully registered.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - like:
 *                     type: object
 *                     properties:
 *                       likes:
 *                         type: string
 *                       liked:
 *                         type: boolean
 *                       likers:
 *                         type: array
 *                         items:
 *                           type: string
 *                       message:
 *                         type: string
 *                   - alreadyLiked:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Post already liked!
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

/**
 * @swagger
 * paths:
 *   /api/likes/{postId}:
 *     delete:
 *       summary: Remove a like from the post with the specified ID.
 *       tags:
 *         - Likes
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: postId
 *           in: path
 *           description: The ID of the post from which the like will be removed.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Like successfully removed.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - like:
 *                     type: object
 *                     properties:
 *                       likes:
 *                         type: string
 *                       liked:
 *                         type: boolean
 *                       likers:
 *                         type: array
 *                         items:
 *                           type: string
 *                       message:
 *                         type: string
 *                   - alreadyUnliked:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Post already unliked!
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
