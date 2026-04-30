// Import mongoose for defining MongoDB schemas and models
import mongoose from "mongoose";

/*
Define the schema for the logs collection.
Each document represents a log message created by one of the services.
*/
const logSchema = new mongoose.Schema(
    {
        // Time when the log message was created
        time: {
            type: Date,
            required: true,
        },

        // Log level, for example: info, warn, error
        level: {
            type: String,
            required: true,
        },

        // Log message text
        msg: {
            type: String,
            required: true,
        },

        // Name of the service that created the log
        service: {
            type: String,
            required: true,
        },

        // HTTP method, for example: GET or POST
        method: {
            type: String,
        },

        // Requested URL
        url: {
            type: String,
        },

        // Endpoint that was accessed
        endpoint: {
            type: String,
        },

        // HTTP response status code
        statusCode: {
            type: Number,
        },
    },
    {
        // Disable the automatic __v field
        versionKey: false,
    }
);

// Create the model and connect it to the logs collection
const Log = mongoose.model("Log", logSchema, "logs");

// Export the Log model
export default Log;