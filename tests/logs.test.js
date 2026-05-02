// Import Jest utilities
import { jest } from "@jest/globals";

// Import dotenv for loading logs-service environment variables
import dotenv from "dotenv";

// Import the same mongoose instance used by logs-service models
import mongoose from "../services/logs-service/node_modules/mongoose/index.js";

// Import supertest for testing Express endpoints
import request from "supertest";

// Import the logs-service Express app
import app from "../services/logs-service/src/app.js";

// Load logs-service environment variables
dotenv.config({ path: "services/logs-service/.env" });

// Increase timeout because MongoDB Atlas can take a few seconds
jest.setTimeout(30000);

/*
Connect to MongoDB before running the tests.
*/
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

/*
Close MongoDB connection after tests.
*/
afterAll(async () => {
    await mongoose.connection.close();
});

describe("Logs Service", () => {
    // Test getting all logs
    it("should return logs array", async () => {
        const response = await request(app).get("/api/logs");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        if (response.body.length > 0) {
            const firstLog = response.body[0];

            expect(firstLog).toHaveProperty("time");
            expect(firstLog).toHaveProperty("level");
            expect(firstLog).toHaveProperty("msg");
            expect(firstLog).toHaveProperty("service");
        }
    });
});