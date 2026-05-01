// Import Express for building the REST API server
import express from "express";

// Import middleware that logs every incoming HTTP request
import { requestLogger } from "./middlewares/request-logger.js";

// Import routes for handling cost-related endpoints
import costsRoutes from "./routes/costs.routes.js";

// Create the Express application instance
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Log every HTTP request received by this service
app.use(requestLogger);

// Mount costs routes under /api
app.use("/api", costsRoutes);

// Temporary route for checking that costs-service is alive
app.get("/", (req, res) => {
    // Return a simple JSON response
    res.json({ message: "costs-service is running" });
});

// Export app for server startup
export default app;