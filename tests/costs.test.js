// Import Jest utilities
import { jest } from "@jest/globals";

// Import dotenv for loading costs-service environment variables
import dotenv from "dotenv";

// Import the same mongoose instance used by costs-service models
import mongoose from "../services/costs-service/node_modules/mongoose/index.js";

// Import supertest for testing Express endpoints
import request from "supertest";

// Import the costs-service Express app
import app from "../services/costs-service/src/app.js";

// Import models for preparing and cleaning test data
import User from "../services/costs-service/src/models/user.model.js";
import Cost from "../services/costs-service/src/models/cost.model.js";
import Report from "../services/costs-service/src/models/report.model.js";

// Load costs-service environment variables
dotenv.config({ path: "services/costs-service/.env" });

// Increase timeout because MongoDB Atlas can take a few seconds
jest.setTimeout(30000);

// Unique test user id
const testUserId = 888002;

/*
Connect to MongoDB and prepare test data before running tests.
*/
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clean old test data if it exists
    await User.deleteOne({ id: testUserId });
    await Cost.deleteMany({ userid: testUserId });
    await Report.deleteMany({ userid: testUserId });

    // Create a user that costs can belong to
    await User.create({
        id: testUserId,
        first_name: "cost",
        last_name: "tester",
        birthday: new Date("2000-01-01"),
    });
});

/*
Clean test data and close MongoDB connection after tests.
*/
afterAll(async () => {
    await User.deleteOne({ id: testUserId });
    await Cost.deleteMany({ userid: testUserId });
    await Report.deleteMany({ userid: testUserId });

    await mongoose.connection.close();
});

describe("Costs Service", () => {
    // Test adding a valid cost item
    it("should add a new cost item", async () => {
        const response = await request(app)
            .post("/api/add")
            .send({
                userid: testUserId,
                description: "milk",
                category: "food",
                sum: 10,
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("userid", testUserId);
        expect(response.body).toHaveProperty("description", "milk");
        expect(response.body).toHaveProperty("category", "food");
        expect(response.body).toHaveProperty("sum", 10);
    });

    // Test adding another valid cost item in another category
    it("should add another cost item", async () => {
        const response = await request(app)
            .post("/api/add")
            .send({
                userid: testUserId,
                description: "gym",
                category: "sports",
                sum: 50,
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("category", "sports");
        expect(response.body).toHaveProperty("sum", 50);
    });

    // Test monthly report
    it("should return monthly report grouped by categories", async () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        const response = await request(app).get(
            `/api/report?id=${testUserId}&year=${year}&month=${month}`
        );

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("userid", testUserId);
        expect(response.body).toHaveProperty("year", year);
        expect(response.body).toHaveProperty("month", month);
        expect(Array.isArray(response.body.costs)).toBe(true);

        const foodGroup = response.body.costs.find((item) => item.food);
        const sportsGroup = response.body.costs.find((item) => item.sports);

        expect(foodGroup.food.length).toBeGreaterThan(0);
        expect(sportsGroup.sports.length).toBeGreaterThan(0);
    });

    // Test adding cost for a user that does not exist
    it("should reject cost for non-existing user", async () => {
        const response = await request(app)
            .post("/api/add")
            .send({
                userid: 999999999,
                description: "invalid",
                category: "food",
                sum: 10,
            });

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("id", "ERR_USER_NOT_FOUND");
        expect(response.body).toHaveProperty("message");
    });

    // Test invalid category
    it("should reject invalid category", async () => {
        const response = await request(app)
            .post("/api/add")
            .send({
                userid: testUserId,
                description: "car",
                category: "cars",
                sum: 10,
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("id", "ERR_VALIDATION");
        expect(response.body).toHaveProperty("message");
    });

    // Test invalid sum
    it("should reject invalid sum", async () => {
        const response = await request(app)
            .post("/api/add")
            .send({
                userid: testUserId,
                description: "bad sum",
                category: "food",
                sum: -5,
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("id", "ERR_VALIDATION");
        expect(response.body).toHaveProperty("message");
    });

    // Test invalid report month
    it("should reject invalid report month", async () => {
        const response = await request(app).get(
            `/api/report?id=${testUserId}&year=2026&month=13`
        );

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("id", "ERR_VALIDATION");
        expect(response.body).toHaveProperty("message");
    });
});