import { Router } from "express";

import authMiddleware from "../middlewares/auth-middleware.js";
import usersMiddleware from "../middlewares/users-middleware.js";
import followersController from "../controllers/followers-controller.js";
import followersMiddleware from "../middlewares/followers-middleware.js";

const followers = Router();

followers
  .all("/*", authMiddleware.tokenValid)
  .post("/:userId", usersMiddleware.userIdParamValid, followersMiddleware.checkFollow, followersMiddleware.checkIsYourself, followersController.follow)
  .delete("/:userId", usersMiddleware.userIdParamValid, followersMiddleware.checkFollow, followersController.unfollow);

export default followers;
/**
 * @swagger
 * paths:
 *   /api/followers/{userId}:
 *     post:
 *       summary: Start following a user.
 *       tags:
 *         - Followers
 *       security:
 *       - bearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: path
 *           description: The ID of the user to follow.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: User successfully followed.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - follow:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Following!
 *                   - alreadyFollowed:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Already followed!
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
 *                 oneOf:
 *                   - followYourself:
 *                     type: object
 *                     properties:
 *                       error:
 *                         type: string
 *                         example: Operation not allowed. You can't follow yourself!
 *                   - expiredToken:
 *                     type: object
 *                     properties:
 *                       error:
 *                         type: string
 *                         example: Invalid or expired token. Please log into your account again!
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
 *       description: Missing or invalid access token.
 */

/**
 * @swagger
 * paths:
 *   /api/followers/{userId}:
 *     delete:
 *       summary: Stop following a user.
 *       tags:
 *         - Followers
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: path
 *           description: The ID of the user to unfollow.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: User successfully unfollowed.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - unfollow:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Unfollowing!
 *                   - alreadyUnfollowed:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Already unfollowed!
 *         '400':
 *           description: Invalid or missing parameters.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                    type: string
 *                    example: The 'userId' parameter is mandatory and must be provided.
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
 *                    type: string
 *                    example: The user specified in the parameter was not found!
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
 *       description: Missing or invalid access token.
 */
//
