/*
Validate input for creating a cost item.
*/
export function validateCostInput(data) {
    // Check required fields exist
    if (!data.userid || !data.description || !data.category || data.sum === undefined) {
        return {
            id: "ERR_VALIDATION",
            message: "Missing required fields",
        };
    }

    // Validate userid
    if (typeof data.userid !== "number") {
        return {
            id: "ERR_VALIDATION",
            message: "userid must be a number",
        };
    }

    // Validate sum
    if (typeof data.sum !== "number" || data.sum <= 0) {
        return {
            id: "ERR_VALIDATION",
            message: "sum must be a positive number",
        };
    }

    // Validate category
    const allowedCategories = ["food", "health", "housing", "sports", "education"];

    if (!allowedCategories.includes(data.category)) {
        return {
            id: "ERR_VALIDATION",
            message: "Invalid category",
        };
    }

    // Everything is valid
    return null;
}

/*
Validate query parameters for creating a monthly report.
*/
export function validateReportQuery(query) {
    // Convert query values from strings to numbers
    const userid = Number(query.id);
    const year = Number(query.year);
    const month = Number(query.month);

    // Check that all required query parameters exist
    if (!query.id || !query.year || !query.month) {
        return {
            error: {
                id: "ERR_VALIDATION",
                message: "Missing required query parameters",
            },
        };
    }

    // Validate user id
    if (!Number.isInteger(userid) || userid <= 0) {
        return {
            error: {
                id: "ERR_VALIDATION",
                message: "id must be a positive number",
            },
        };
    }

    // Validate year
    if (!Number.isInteger(year) || year <= 0) {
        return {
            error: {
                id: "ERR_VALIDATION",
                message: "year must be a positive number",
            },
        };
    }

    // Validate month
    if (!Number.isInteger(month) || month < 1 || month > 12) {
        return {
            error: {
                id: "ERR_VALIDATION",
                message: "month must be between 1 and 12",
            },
        };
    }

    // Return clean numeric values after validation
    return {
        value: {
            userid,
            year,
            month,
        },
    };
}