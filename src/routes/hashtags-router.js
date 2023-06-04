import { Router } from "express";

import authMiddleware from "../middlewares/auth-middleware.js";
import hashtagsMiddleware from "../middlewares/hashtags-middleware.js";
import hashtagsController from "../controllers/hashtags-controller.js";

const hashtags = Router();

hashtags
  .all("/*", authMiddleware.tokenValid)
  .get("/", hashtagsController.hashtagsTrending)
  .get("/:hashtag", hashtagsMiddleware.hashtagIsValid, hashtagsController.hashtagPosts);

export default hashtags;
/**
 * @swagger
 * paths:
 *   /api/hashtags:
 *     get:
 *       summary: Get the list of trending hashtags.
 *       tags:
 *         - Hashtags
 *       security:
 *       - bearerAuth: []
 *       description: Returns the top 10 most used hashtags.
 *       responses:
 *         '200':
 *           description: List of hashtags returned successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Hashtag ID.
 *                     hashtag:
 *                       type: string
 *                       description: Hashtag name.
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

/**
 * @swagger
 * paths:
 *   /api/hashtags/{hashtag}:
 *     get:
 *       summary: Get all posts with the specified hashtag.
 *       tags:
 *         - Hashtags
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: hashtag
 *           in: path
 *           description: The keyword of the hashtag to search for in the posts.
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: List of posts returned successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   posts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         userId:
 *                           type: integer
 *                         username:
 *                           type: string
 *                         picture:
 *                           type: string
 *                           format: uri
 *                         text:
 *                           type: string
 *                         link:
 *                           type: object
 *                           properties:
 *                             url:
 *                               type: string
 *                               format: uri
 *                             title:
 *                               type: string
 *                             image:
 *                               type: string
 *                               format: uri
 *                             description:
 *                               type: string
 *                         likes:
 *                           type: integer
 *                         liked:
 *                           type: boolean
 *                         likers:
 *                           type: array
 *                           items:
 *                             type: string
 *                         comments:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               userId:
 *                                 type: integer
 *                               username:
 *                                 type: string
 *                               text:
 *                                 type: string
 *         '400':
 *           description: Invalid or missing parameters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: The 'hashtag' parameter is mandatory and must be provided.
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
