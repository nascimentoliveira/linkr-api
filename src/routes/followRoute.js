import { Router } from "express";
import { follow, unfollow } from "../controllers/followController.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

const followRouter = Router();

followRouter.get("/follow/:id", tokenValid, follow);
followRouter.delete("/follow/:id", tokenValid, unfollow);

export default followRouter;
