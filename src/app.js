import express from "express";
import cors from "cors";

import loadEnv from "./envs.js";
import routers from "./routes/index.js";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/api", routers)
  .use("/", health);

export default app;
//
