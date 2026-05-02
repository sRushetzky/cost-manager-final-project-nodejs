// Import the service function that reads logs from MongoDB
import { getLogs } from "../services/logs.service.js";

// Import logger utility for endpoint access logging
import { saveLog } from "../utils/logger.js";

// Handle GET /api/logs
export async function getAllLogs(req, res, next) {
    try {
        // Log endpoint access as required by the project
        if (process.env.NODE_ENV !== "test") {
            await saveLog("info", "Endpoint accessed", {
                endpoint: "GET /api/logs",
            });
        }

        // Get all logs from the service layer
        const logs = await getLogs();

        // Return the logs as JSON
        return res.json(logs);
    } catch (err) {
        // Forward errors to the error handler
        return next(err);
    }
}