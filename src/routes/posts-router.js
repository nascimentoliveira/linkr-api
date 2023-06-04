import { Router } from "express";

import postSchema from "../models/posts-model.js";
import validateSchema from "../middlewares/schemaValidator.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import postsMiddleware from "../middlewares/posts-middleware.js";
import usersMiddleware from "../middlewares/users-middleware.js";
import postsController from "../controllers/posts-controller.js";

const posts = Router();

posts
  .all("/*", authMiddleware.tokenValid)
  .post("/", validateSchema(postSchema), postsMiddleware.getMetadata, postsController.createPost)
  .get("/", postsMiddleware.getFollowedUsers, postsController.getPosts)
  .get("/users/:userId", usersMiddleware.userIdParamValid, postsMiddleware.checkFollow, postsController.getUserPosts)
  .put("/:postId", postsMiddleware.postIdValid, postsMiddleware.checkIsOwner, postsController.editPost)
  .delete("/:postId", postsMiddleware.postIdValid, postsMiddleware.checkIsOwner, postsController.deletePost);

export default posts;
/**
 * @swagger
 * paths:
 *   /api/posts:
 *     post:
 *       summary: Create a new post.
 *       tags:
 *         - Posts
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://www.example.com"
 *                 text:
 *                   type: string
 *                   example: "Example #text"
 *               required:
 *                 - url
 *       responses:
 *         '200':
 *           description: Post created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Link published successfully!
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
 *       description: Access token missing or invalid.
 */

/**
 * @swagger
 * paths:
 *   /api/posts:
 *     get:
 *       summary: Get your own posts and posts from followed users.
 *       tags:
 *         - Posts
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successfully returned a list of posts.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   follows:
 *                     type: boolean
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
 *                               username:
 *                                 type: string
 *                               picture:
 *                                 type: string
 *                                 format: uri
 *                               userId:
 *                                 type: integer
 *                               comment:
 *                                 type: string
 *                               isAuthor:
 *                                 type: boolean
 *                               follows:
 *                                 type: boolean
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
 *       description: Access token missing or invalid.
 */

/**
 * @swagger
 * paths:
 *   /api/posts/users/{userId}:
 *     get:
 *       summary: Get posts from a specific user.
 *       tags:
 *         - Posts
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: path
 *           description: The user ID whose posts will be displayed.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successfully returned a list of user posts.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   header:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       picture:
 *                         type: string
 *                         format: uri
 *                       follows:
 *                         type: boolean
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
 *                               username:
 *                                 type: string
 *                               picture:
 *                                 type: string
 *                                 format: uri
 *                               userId:
 *                                 type: integer
 *                               comment:
 *                                 type: string
 *                               isAuthor:
 *                                 type: boolean
 *                               follows:
 *                                 type: boolean
 *         '400':
 *           description: Invalid or missing parameters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: The 'userId' parameter is mandatory and must be provided.
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
 *           description: User with the specified ID not found.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: The user specified in the parameter was not found!
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
 *       description: Access token missing or invalid.
 */

/**
 * @swagger
 * paths:
 *   /api/posts/{postId}:
 *     put:
 *       summary: Edit an existing post.
 *       tags:
 *         - Posts
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: postId
 *           in: path
 *           description: The ID of the post whose comment will be edited.
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
 *                 text:
 *                   type: string
 *                   example: "#new text"
 *       responses:
 *         '200':
 *           description: Post edited successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     example: "#new text"
 *                   message:
 *                     type: string
 *                     example: Post edited!
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
 *                 oneOf:
 *                   - notOwner:
 *                     type: object
 *                     properties:
 *                       error:
 *                         type: string
 *                         example: Operation not allowed. You are not the owner of this post!
 *                   - expiredToken:
 *                     type: object
 *                     properties:
 *                       error:
 *                         type: string
 *                         example: Invalid or expired token. Please log into your account again!
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
 *       description: Access token missing or invalid.
 */

/**
 * @swagger
 * paths:
 *   /api/posts/{postId}:
 *     delete:
 *       summary: Delete an existing post.
 *       tags:
 *         - Posts
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: postId
 *           in: path
 *           description: The ID of the post to be deleted.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Post deleted successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Post deleted!
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
 *                 oneOf:
 *                   - notOwner:
 *                     type: object
 *                     properties:
 *                       error:
 *                         type: string
 *                         example: Operation not allowed. You are not the owner of this post!
 *                   - expiredToken:
 *                     type: object
 *                     properties:
 *                       error:
 *                         type: string
 *                         example: Invalid or expired token. Please log into your account again!
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
 *       description: Access token missing or invalid.
 */
//
