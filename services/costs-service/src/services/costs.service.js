// Import the Cost model for cost database operations
import Cost from "../models/cost.model.js";

// Import the User model for checking that userid exists
import User from "../models/user.model.js";

// Import Report model for caching reports (Computed Pattern)
import Report from "../models/report.model.js";

/*
Create a standard error object with id, message and status code.
*/
function createAppError(id, message, statusCode) {
    // Create a regular JavaScript error
    const error = new Error(message);

    // Add project-style error id
    error.id = id;

    // Add HTTP status code
    error.statusCode = statusCode;

    // Return the error
    return error;
}

/*
Create a new cost item in the database.
*/
export async function createCost(costData) {
    // Check if the user exists before adding a cost
    const user = await User.findOne({ id: costData.userid });

    // If user does not exist, reject the request
    if (!user) {
        throw createAppError("ERR_USER_NOT_FOUND", "User not found", 404);
    }

    // Create the cost item in the costs collection
    const cost = await Cost.create(costData);

    // Return the created cost item
    return cost;
}

/*
Generate a monthly report for a user.
Implements the Computed Design Pattern.
*/
export async function getReport(userid, year, month) {
    // Check if a cached report already exists
    const existingReport = await Report.findOne({ userid, year, month });

    if (existingReport) {
        // Return cached report if exists
        return existingReport.costs;
    }

    // Define date range for the requested month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // Fetch all costs for the user in that month
    const costs = await Cost.find({
        userid,
        created_at: {
            $gte: startDate,
            $lt: endDate,
        },
    });

    // Initialize categories structure
    const report = {
        food: [],
        health: [],
        housing: [],
        sports: [],
        education: [],
    };

    // Group costs by category
    costs.forEach((cost) => {
        report[cost.category].push({
            sum: cost.sum,
            description: cost.description,
            day: cost.created_at.getDate(),
        });
    });

    // Determine if the month is in the past
    const now = new Date();
    const isPastMonth =
        year < now.getFullYear() ||
        (year === now.getFullYear() && month < now.getMonth() + 1);

    // If past month → save computed report
    if (isPastMonth) {
        await Report.create({
            userid,
            year,
            month,
            costs: report,
        });
    }

    // Return the computed report
    return report;
}