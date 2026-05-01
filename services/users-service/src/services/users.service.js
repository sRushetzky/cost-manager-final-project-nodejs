// Import the User model for database operations
import User from "../models/user.model.js";

// Import the Cost model for calculating user total costs
import Cost from "../models/cost.model.js";

/*
Create a new user in the database.
*/
export async function createUser(userData) {
    // Create a new user document
    const user = await User.create(userData);

    // Return the created user
    return user;
}

/*
Fetch all users from the database.
*/
export async function getUsers() {
    // Return all user documents
    return User.find({});
}

/*
Fetch one user by id and calculate the total costs of that user.
*/
export async function getUserById(userId) {
    // Find the user by the application id field
    const user = await User.findOne({ id: userId });

    // If the user does not exist, return null
    if (!user) {
        return null;
    }

    // Calculate the total sum of all costs that belong to the user
    const result = await Cost.aggregate([
        { $match: { userid: userId } },
        { $group: { _id: null, total: { $sum: "$sum" } } },
    ]);

    // If the user has no costs, the total should be 0
    const total = result.length > 0 ? result[0].total : 0;

    // Return only the fields required by the project
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id,
        total,
    };
}