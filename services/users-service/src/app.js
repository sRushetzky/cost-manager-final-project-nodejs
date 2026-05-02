// Import Express for building the REST API server
import express from "express";

// Import the users API routes
import usersRoutes from "./routes/users.routes.js";

// Import middleware that logs every incoming HTTP request
import { requestLogger } from "./middlewares/request-logger.js";

// Import global error handler
import { errorHandler } from "./middlewares/errorHandler.js";

// Create the Express application instance
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Log every HTTP request received by this service
app.use(requestLogger);

// Mount users routes under /api
app.use("/api", usersRoutes);

// Temporary route for checking that users-service is alive
app.get("/", (req, res) => {
    // Return a simple JSON response
    res.json({ message: "users-service is running" });
});

// Handle errors in one central place
app.use(errorHandler);

// Export app for server startup
export default app;