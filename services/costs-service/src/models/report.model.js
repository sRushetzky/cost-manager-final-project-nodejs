// Import mongoose for defining the schema
import mongoose from "mongoose";

/*
Define the schema for cached monthly reports.
This model is used to implement the Computed Design Pattern.
*/
const reportSchema = new mongoose.Schema(
    {
        // User ID for whom the report was created
        userid: {
            type: Number,
            required: true,
        },

        // Report year
        year: {
            type: Number,
            required: true,
        },

        // Report month
        month: {
            type: Number,
            required: true,
        },

        // Costs grouped by categories
        costs: {
            type: Array,
            required: true,
        },
    },
    {
        // Disable the automatic __v field
        versionKey: false,
    }
);

// Make sure each user has only one cached report per month and year
reportSchema.index({ userid: 1, year: 1, month: 1 }, { unique: true });

// Create the model and connect it to the reports collection
const Report = mongoose.model("Report", reportSchema, "reports");

// Export the Report model
export default Report;