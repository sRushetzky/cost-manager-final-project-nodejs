// Import service functions for user operations
import { createUser, getUsers, getUserById } from "../services/users.service.js";

// Import logger utility for endpoint access logging
import { saveLog } from "../utils/logger.js";

// Import validation functions
import {
    validateUserInput,
    validateUserIdParam,
} from "../utils/validators.js";

/*
Handle POST /api/add for adding a new user.
*/
export async function addUser(req, res, next) {
    try {
        // Validate input
        const validationError = validateUserInput(req.body);

        if (validationError) {
            return res.status(400).json(validationError);
        }

        await saveLog("info", "Endpoint accessed", {
            endpoint: "POST /api/add",
        });

        const user = await createUser(req.body);

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
        // Validate id param
        const result = validateUserIdParam(req.params.id);

        if (result.error) {
            return res.status(400).json(result.error);
        }

        const userId = result.value;

        await saveLog("info", "Endpoint accessed", {
            endpoint: `GET /api/users/${userId}`,
        });

        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({
                id: "ERR_USER_NOT_FOUND",
                message: "User not found",
            });
        }

        return res.json(user);
    } catch (err) {
        return next(err);
    }
}