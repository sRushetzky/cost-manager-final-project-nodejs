// Load environment variables from the .env file
import "dotenv/config";

// Import the Express app configuration
import app from "./app.js";

// Import MongoDB connection function
import { connectMongo } from "./config/db.js";

// Define the port for the logs-service process
const port = process.env.PORT || 3001;

/*
Start the server only after MongoDB connection is ready.
*/
async function start() {
    // Connect to MongoDB using the connection string from .env
    await connectMongo(process.env.MONGODB_URI);

    // Start listening for incoming HTTP requests
    app.listen(port, () => {
        console.log(`logs-service is running on http://localhost:${port}`);
    });
}

// Run startup and handle errors
start().catch((err) => {
    // Print startup failure
    console.error("Failed to start logs-service:", err.message);

    // Exit process with failure code
    process.exit(1);
});