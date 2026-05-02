// Import supertest for HTTP testing
import request from "supertest";

// Import the Express app from admin-service
import app from "../services/admin-service/src/app.js";


describe("Admin Service - /api/about", () => {

    // Test: should return team members
    it("should return team members with first_name and last_name only", async () => {

        // Send GET request to /api/about
        const response = await request(app).get("/api/about");

        // Check status code
        expect(response.statusCode).toBe(200);

        // Check that response is an array
        expect(Array.isArray(response.body)).toBe(true);

        // Check that array is not empty
        expect(response.body.length).toBeGreaterThan(0);

        // Validate each object in array
        response.body.forEach(member => {

            // Check required fields exist
            expect(member).toHaveProperty("first_name");
            expect(member).toHaveProperty("last_name");

            // Ensure no extra fields
            expect(Object.keys(member).length).toBe(2);
        });
    });

});