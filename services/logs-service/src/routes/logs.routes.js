// Import Router from Express for defining endpoint routes
import { Router } from "express";

// Import controller function for logs endpoint
import { getAllLogs } from "../controllers/logs.controller.js";

// Create a new router instance
const router = Router();

// Handle GET requests for listing all logs
router.get("/logs", getAllLogs);

// Export the router
export default router;