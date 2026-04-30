// Import the Log model for reading log documents from MongoDB
import Log from "../models/log.model.js";

/*
Fetch all log documents from the logs collection.
The response uses the same property names stored in the collection.
*/
export async function getLogs() {
    // Return all logs without the internal MongoDB _id field
    return Log.find({}, { _id: 0 }).lean();
}