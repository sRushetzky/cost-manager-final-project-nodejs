// Import Router from Express
import { Router } from "express";

// Import logger utility for endpoint access logging
import { saveLog } from "../utils/logger.js";

// Create router instance
const router = Router();

/*
Return team members details.
According to requirements, only first_name and last_name are allowed.
*/
router.get("/about", async (req, res, next) => {
    try {
        // Log endpoint access as required by the project
        // Log endpoint access only outside unit tests
        if (process.env.NODE_ENV !== "test") {
            await saveLog("info", "Endpoint accessed", {
                endpoint: "GET /api/about",
            });
        }

        // Return team members without storing them in the database
        return res.json([
            {
                first_name: "Shahar",
                last_name: "Rushetzky",
            },
            {
                first_name: "Itamar",
                last_name: "Shapira",
            },
        ]);
    } catch (err) {
        // Forward errors to the global error handler
        return next(err);
    }
});

// Export router
export default router;