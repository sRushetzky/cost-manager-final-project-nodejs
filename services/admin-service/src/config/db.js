// Import mongoose for MongoDB connection
import mongoose from "mongoose";

/*
Connect to MongoDB using the connection string from the .env file.
*/
export async function connectMongo(mongoUri) {
    // Validate that the MongoDB connection string exists
    if (!mongoUri) {
        throw new Error("Missing MONGODB_URI");
    }

    try {
        // Connect to MongoDB Atlas using Mongoose
        await mongoose.connect(mongoUri);

        // Print success message after connection
        console.log("MongoDB connected successfully");

        // Return the active mongoose connection
        return mongoose.connection;
    } catch (error) {
        // Print the connection error message
        console.error("MongoDB connection failed:", error.message);

        // Throw the error so server startup can fail clearly
        throw error;
    }
}