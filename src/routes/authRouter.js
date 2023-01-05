import { Router } from "express";
import { authValidator } from "../middlewares/authMiddleware.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";
import { signUp, signIn} from "../controllers/authController.js";

const router = Router();

router.post("/signup", authValidator(signUpSchema), signUp);
router.post("/", authValidator(signInSchema), signIn);

export default router;