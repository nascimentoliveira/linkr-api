import { Router } from "express";

import { checkDatabaseConnection } from "../database/database.js";

const health = Router();

health
  .get("/", async (req, res) => {
    const databaseStatus = await checkDatabaseConnection();
    const isHealthy = (databaseStatus === "connected");
    res.status(isHealthy ? 200 : 500).send({
      description: "Linkr-API",
      status: isHealthy ? "healthy" : "unhealthy",
      database: databaseStatus,
      timestamp: new Date().toISOString(),
    });
  });

export default health;
/**
 * @swagger
 * paths:
 *   /api/health:
 *     get:
 *       summary: Check API status.
 *       tags:
 *         - Health
 *       description: Checks if the API is running and the database is connected.
 *       responses:
 *         '200':
 *           description: Status checked successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   description:
 *                     type: string
 *                     description: API description.
 *                   status:
 *                     type: string
 *                     description: Server health status.
 *                   database:
 *                     type: string
 *                     description: Database connection status.
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: Response timestamp.
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   description:
 *                     type: string
 *                     description: API status description.
 *                   status:
 *                     type: string
 *                     description: Server health status.
 *                   database:
 *                     type: string
 *                     description: Database connection status.
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: Response timestamp.
 */
//
