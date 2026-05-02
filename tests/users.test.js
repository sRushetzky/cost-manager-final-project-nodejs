import { jest } from "@jest/globals";

// Import dotenv for loading the users-service environment variables
import dotenv from "dotenv";

// Import mongoose for connecting and disconnecting from MongoDB
import mongoose from "../services/users-service/node_modules/mongoose/index.js";

// Import supertest for testing Express endpoints
import request from "supertest";

// Import the users-service Express app
import app from "../services/users-service/src/app.js";

// Import models for cleaning test data
import User from "../services/users-service/src/models/user.model.js";
import Cost from "../services/users-service/src/models/cost.model.js";

// Increase timeout because MongoDB Atlas connection can take a few seconds
jest.setTimeout(30000);

// Load the same .env file used by users-service
dotenv.config({ path: "services/users-service/.env" });

// Unique user id for this test file
const testUserId = 888001;

/*
Connect to MongoDB before running the tests.
*/
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clean old test data if it exists
    await User.deleteOne({ id: testUserId });
    await Cost.deleteMany({ userid: testUserId });
});

/*
Clean test data and close MongoDB connection after tests.
*/
afterAll(async () => {
    await User.deleteOne({ id: testUserId });
    await Cost.deleteMany({ userid: testUserId });

    await mongoose.connection.close();
});

describe("Users Service", () => {
    // Test adding a new user
    it("should add a new user", async () => {
        const response = await request(app)
            .post("/api/add")
            .send({
                id: testUserId,
                first_name: "unit",
                last_name: "test",
                birthday: "2000-01-01",
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id", testUserId);
        expect(response.body).toHaveProperty("first_name", "unit");
        expect(response.body).toHaveProperty("last_name", "test");
    });

    // Test getting all users
    it("should return all users", async () => {
        const response = await request(app).get("/api/users");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test getting a specific user with total
    it("should return user details with total", async () => {
        const response = await request(app).get(`/api/users/${testUserId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", testUserId);
        expect(response.body).toHaveProperty("first_name");
        expect(response.body).toHaveProperty("last_name");
        expect(response.body).toHaveProperty("total");
    });

    // Test duplicate user error
    it("should reject duplicate user id", async () => {
        const response = await request(app)
            .post("/api/add")
            .send({
                id: testUserId,
                first_name: "duplicate",
                last_name: "user",
                birthday: "2000-01-01",
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("id", "ERR_DUPLICATE");
        expect(response.body).toHaveProperty("message");
    });

    // Test invalid user input
    it("should reject invalid user input", async () => {
        const response = await request(app)
            .post("/api/add")
            .send({
                id: -5,
                first_name: "bad",
                last_name: "user",
                birthday: "2000-01-01",
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("id", "ERR_VALIDATION");
        expect(response.body).toHaveProperty("message");
    });

    // Test invalid user id param
    it("should reject invalid user id param", async () => {
        const response = await request(app).get("/api/users/abc");

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("id", "ERR_VALIDATION");
        expect(response.body).toHaveProperty("message");
    });
});