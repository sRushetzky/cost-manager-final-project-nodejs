// Import mongoose for defining the schema
import mongoose from "mongoose";

/*
Define the schema for the users collection.
This model is used here only to verify that a userid exists.
*/
const userSchema = new mongoose.Schema(
    {
        // User ID, different from MongoDB _id
        id: {
            type: Number,
            required: true,
            unique: true,
        },

        // First name of the user
        first_name: {
            type: String,
            required: true,
        },

        // Last name of the user
        last_name: {
            type: String,
            required: true,
        },

        // Birthday of the user
        birthday: {
            type: Date,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

// Create the model and connect it to the users collection
const User = mongoose.model("User", userSchema, "users");

// Export the User model
export default User;