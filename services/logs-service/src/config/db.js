// Import mongoose for MongoDB connection
import mongoose from "mongoose";

/*
Connect to MongoDB using the connection string from .env
*/
export async function connectMongo(mongoUri) {
    // Validate that a connection string exists
    if (!mongoUri) {
        throw new Error("Missing MONGODB_URI");
    }

    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(mongoUri);

        // Log successful connection
        console.log("MongoDB connected successfully");

        return mongoose.connection;
    } catch (error) {
        // Log connection error
        console.error("MongoDB connection failed:", error.message);

        throw error;
    }
}