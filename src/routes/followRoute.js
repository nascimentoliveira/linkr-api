import { Router } from "express";
import { follow } from "../controllers/followController.js";
import { tokenValid } from "../middlewares/authMiddleware.js";

const followRouter = Router();

followRouter.post("/follow",tokenValid,follow);
followRouter.delete("/follow",tokenValid)

export default followRouter;
