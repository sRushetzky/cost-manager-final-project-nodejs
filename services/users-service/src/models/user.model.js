// Import mongoose for defining the schema
import mongoose from "mongoose";

/*
Define the schema for the users collection.
*/
const userSchema = new mongoose.Schema({
    // User ID (different from MongoDB _id)
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
});

/*
Create and export the User model.
*/
const User = mongoose.model("User", userSchema);

export default User;