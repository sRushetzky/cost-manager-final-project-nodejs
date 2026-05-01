// Import service functions
import { createCost, getReport } from "../services/costs.service.js";

// Import logger
import { saveLog } from "../utils/logger.js";

/*
Handle POST /api/add for adding a new cost item.
*/
export async function addCost(req, res, next) {
    try {
        await saveLog("info", "Endpoint accessed", {
            endpoint: "POST /api/add",
        });

        const cost = await createCost(req.body);

        return res.status(201).json(cost);
    } catch (err) {
        return next(err);
    }
}

/*
Handle GET /api/report for generating a monthly report.
*/
export async function getMonthlyReport(req, res, next) {
    try {
        // Extract query parameters
        const userid = Number(req.query.id);
        const year = Number(req.query.year);
        const month = Number(req.query.month);

        // Log endpoint access
        await saveLog("info", "Endpoint accessed", {
            endpoint: "GET /api/report",
            userid,
            year,
            month,
        });

        // Generate the report
        const report = await getReport(userid, year, month);

        // Return the response in required format
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