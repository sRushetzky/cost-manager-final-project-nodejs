// Load environment variables from .env
import "dotenv/config";

// Import the Express app
import app from "./app.js";

// Import MongoDB connection function
import { connectMongo } from "./config/db.js";

// Define port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`logs-service running on port ${PORT}`);
});

/*
Start the server after connecting to MongoDB
*/
async function start() {
    // Connect to MongoDB
    await connectMongo(process.env.MONGODB_URI);

    // Start listening
    app.listen(port, () => {
        console.log(`logs-service is running on http://localhost:${port}`);
    });
}

// Handle startup errors
start().catch((err) => {
    console.error("Failed to start logs-service:", err.message);
    process.exit(1);
});