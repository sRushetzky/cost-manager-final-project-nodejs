// Import mongoose for defining the schema
import mongoose from "mongoose";

/*
Define the schema for the costs collection.
This model is used here only for calculating the user's total costs.
*/
const costSchema = new mongoose.Schema(
    {
        // User ID that owns the cost item
        userid: {
            type: Number,
            required: true,
        },

        // Description of the cost item
        description: {
            type: String,
            required: true,
        },

        // Category of the cost item
        category: {
            type: String,
            required: true,
        },

        // Cost amount
        sum: {
            type: Number,
            required: true,
        },
    },
    {
        // Disable the automatic __v field
        versionKey: false,
    }
);

// Create the model and connect it to the costs collection
const Cost = mongoose.model("Cost", costSchema, "costs");

// Export the Cost model
export default Cost;