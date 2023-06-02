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
 *       summary: Obter o ranking com 10 hashtags.
 *       tags:
 *         - Hashtags
 *       security:
 *       - bearerAuth: []
 *       description: Retorna as 10 hashtags mais usadas.
 *       responses:
 *         '200':
 *           description: Sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       format: int64
 *                       description: ID da hashtag
 *                     hashtag:
 *                       type: string
 *                       description: Nome da hashtag
 *         '401':
 *           description: Token de acesso ausente ou inválido
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Unexpected header format! Field "Authorization" not found.
 *         '500':
 *           description: Erro interno do servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                    type: string
 *                    example: An internal server error has occurred. Please try again later.
 *   /api/hashtags/:hashtag:
 *     get:
 *       summary: Apaga um link encurtado pelo ID.
 *       tags:
 *         - Hashtags
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: hashtag
 *           in: path
 *           description: Hashtag a ser buscada.
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/URLResponseDELETE'
 *         '401':
 *           description: Token de acesso ausente ou inválido
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Unexpected header format! Field "Authorization" not found.
 *         '404':
 *           description: Hashtag não encontrada.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: hashtag not registered!
 *         '500':
 *           description: Erro interno do servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                    type: string
 *                    example: An internal server error has occurred. Please try again later.
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Token de acesso ausente ou inválido
 */
//
