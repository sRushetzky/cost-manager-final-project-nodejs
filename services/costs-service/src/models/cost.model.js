// Import mongoose for defining the schema
import mongoose from "mongoose";

/*
Define the schema for the costs collection.
*/
const costSchema = new mongoose.Schema(
    {
        // Description of the cost item
        description: {
            type: String,
            required: true,
        },

        // Category of the cost item
        category: {
            type: String,
            required: true,
            enum: ["food", "health", "housing", "sports", "education"],
        },

        // User ID that owns the cost
        userid: {
            type: Number,
            required: true,
        },

        // Cost amount
        sum: {
            type: Number,
            required: true,
        },

        // Date of the cost item
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

// Create the model and connect it to the costs collection
const Cost = mongoose.model("Cost", costSchema, "costs");

// Export the model
export default Cost;