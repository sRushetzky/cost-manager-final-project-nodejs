// Import Router from Express for defining endpoint routes
import { Router } from "express";

// Import controller functions
import {
    addUser,
    getAllUsers,
    getUserDetails,
} from "../controllers/users.controller.js";

// Create a new router instance
const router = Router();

// Get all users
router.get("/users", getAllUsers);

// Get user by id
router.get("/users/:id", getUserDetails);

// Add new user
router.post("/add", addUser);

// Export the router
export default router;