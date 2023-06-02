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
 *       summary: Realizar login do usuário.
 *       tags:
 *         - Autenticação
 *       description: Esta rota é responsável por autenticar os usuários na aplicação. Ela permite que os usuários realizem o login fornecendo seu email e senha.
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
 *           description: Sucesso
 *           content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     example: ef9e3e32-e9c0-4bfe-a407-027b45efd990
 *                   userId:
 *                     type: number
 *                   username:
 *                     type: string
 *                     example: John Doe
 *                   picture:
 *                     type: string
 *                     example: https://www.image-profile-url.com/user-image-profile
 *         '404':
 *           description: Usuário não cadastrado ou senha inválida.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: User not registered!
 *         '422':
 *           description: Dados inválidos ou incompletos
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Body is not the expected format!
 *                   errors:
 *                     type: array
 *                     items:
 *                       oneOf:
 *                         - type: string
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
 */

/**
 * @swagger
 * paths:
 *   /api/auth/signup:
 *     post:
 *       summary: Cadastrar novo usuário.
 *       tags:
 *         - Usuários
 *       description: Esta rota é responsável por cadastrar os usuários na aplicação. Ela permite que os usuários utilize a plataforma fornecendo seu email, senha, nome e url da imagem.
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
 *           description: Usuário cadastrado com sucesso.
 *           content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: User successfully created!
 *         '409':
 *           description: Dados inválidos para cadastro de usuário.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: E-mail already registered!
 *         '422':
 *           description: Dados inválidos ou incompletos
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Body is not the expected format!
 *                   errors:
 *                     type: array
 *                     items:
 *                       oneOf:
 *                         - type: string
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
 */