// Import service functions
import { createCost, getReport } from "../services/costs.service.js";

// Import logger
import { saveLog } from "../utils/logger.js";

// Import validation function
// Import validation functions
import {
    validateCostInput,
    validateReportQuery,
} from "../utils/validators.js";

/*
Handle POST /api/add for adding a new cost item.
*/
export async function addCost(req, res, next) {
    try {
        // Validate input before doing anything else
        const validationError = validateCostInput(req.body);

        if (validationError) {
            return res.status(400).json(validationError);
        }

        // Log endpoint access
        await saveLog("info", "Endpoint accessed", {
            endpoint: "POST /api/add",
        });

        // Create cost item
        const cost = await createCost(req.body);

        return res.status(201).json(cost);
    } catch (err) {
        return next(err);
    }
}

/*
Handle GET /api/report for generating a monthly report.
*/
/*
Handle GET /api/report for generating a monthly report.
*/
export async function getMonthlyReport(req, res, next) {
    try {
        // Validate query parameters before generating the report
        const result = validateReportQuery(req.query);

        if (result.error) {
            return res.status(400).json(result.error);
        }

        // Extract validated numeric values
        const { userid, year, month } = result.value;

        // Log endpoint access
        await saveLog("info", "Endpoint accessed", {
            endpoint: "GET /api/report",
            userid,
            year,
            month,
        });

        // Generate the monthly report
        const report = await getReport(userid, year, month);

        // Return the response in the required format
        return res.json({
            userid,
            year,
            month,
            costs: [
                { food: report.food },
                { health: report.health },
                { housing: report.housing },
                { sports: report.sports },
                { education: report.education },
            ],
        });
    } catch (err) {
        return next(err);
    }
}