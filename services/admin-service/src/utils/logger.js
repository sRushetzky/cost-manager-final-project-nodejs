// Import Pino for creating structured log messages
import pino from "pino";

// Import the Log model for saving log documents in MongoDB
import Log from "../models/log.model.js";

// Define the current service name
const serviceName = process.env.SERVICE_NAME || "admin-service";

// Create a Pino logger instance
export const logger = pino({
    base: { service: serviceName },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
});

/*
Save a log message in the MongoDB logs collection.
The same message is also printed by Pino to the console.
*/
export async function saveLog(level, msg, extra = {}) {
    // Print the log message using Pino
    logger[level]({ ...extra }, msg);

    // Save the log message in MongoDB
    await Log.create({
        time: new Date(),
        level,
        msg,
        service: serviceName,
        ...extra,
    });
}