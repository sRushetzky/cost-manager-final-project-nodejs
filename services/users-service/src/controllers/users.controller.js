// Import service functions for user operations
import { createUser, getUsers, getUserById } from "../services/users.service.js";

// Import logger utility for endpoint access logging
import { saveLog } from "../utils/logger.js";

/*
Handle POST /api/add for adding a new user.
*/
export async function addUser(req, res, next) {
    try {
        // Log endpoint access as required by the project
        await saveLog("info", "Endpoint accessed", {
            endpoint: "POST /api/add",
        });

        // Create a new user using the request body
        const user = await createUser(req.body);

        // Return the created user as JSON
        return res.status(201).json(user);
    } catch (err) {
        return next(err);
    }
}

/*
Handle GET /api/users for listing all users.
*/
export async function getAllUsers(req, res, next) {
    try {
        await saveLog("info", "Endpoint accessed", {
            endpoint: "GET /api/users",
        });

        const users = await getUsers();

        return res.json(users);
    } catch (err) {
        return next(err);
    }
}

/*
Handle GET /api/users/:id for retrieving a specific user and total costs.
*/
export async function getUserDetails(req, res, next) {
    try {
        // Extract id from URL params
        const userId = Number(req.params.id);

        // Log endpoint access
        await saveLog("info", "Endpoint accessed", {
            endpoint: `GET /api/users/${userId}`,
        });

        // Fetch user details + total
        const user = await getUserById(userId);

        // If user not found → 404
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return the user data
        return res.json(user);
    } catch (err) {
        return next(err);
    }
}