// Import the saveLog function for writing logs to MongoDB
import { saveLog } from "../utils/logger.js";

/*
Middleware that logs every incoming HTTP request
and its response status code.
*/
export function requestLogger(req, res, next) {
    // Log when the request is received
    saveLog("info", "HTTP request received", {
        method: req.method,
        url: req.originalUrl,
    }).catch((err) => {
        console.error("Log error:", err.message);
    });

    // After response is sent, log the status code
    res.on("finish", () => {
        saveLog("info", "HTTP response sent", {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
        }).catch((err) => {
            console.error("Log error:", err.message);
        });
    });

    // Continue to the next middleware or route
    next();
}