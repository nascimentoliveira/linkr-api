import { Router } from 'express';
import { signInSchema, signUpSchema } from '../schemas/authSchema.js';
import { signUp, signIn } from '../controllers/authController.js';
import validateSchema from '../middlewares/schemaValidator.js';
import { signInValid, signUpValid } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', validateSchema(signUpSchema), signUpValid, signUp);
router.post('/signin', validateSchema(signInSchema), signInValid, signIn);

export default router;