// Import Router from Express for defining endpoint routes
import { Router } from "express";

// Import controller functions for cost endpoints
import {
    addCost,
    getMonthlyReport,
} from "../controllers/costs.controller.js";

// Create a new router instance
const router = Router();

// Handle POST requests for adding a new cost item
router.post("/add", addCost);

// Handle GET requests for generating monthly reports
router.get("/report", getMonthlyReport);

// Export the router
export default router;