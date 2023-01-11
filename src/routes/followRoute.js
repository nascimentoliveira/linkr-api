import { Router } from "express";
import { tokenValid } from "../middlewares/authMiddleware.js";

const followRouter = Router();

followRouter.post("/follow",tokenValid);
followRouter.delete("/follow",tokenValid)

export default followRouter;
