/*
Validate input for creating a new user.
*/
export function validateUserInput(data) {
    // Check required fields
    if (!data.id || !data.first_name || !data.last_name || !data.birthday) {
        return {
            id: "ERR_VALIDATION",
            message: "Missing required fields",
        };
    }

    // Validate id
    if (!Number.isInteger(data.id) || data.id <= 0) {
        return {
            id: "ERR_VALIDATION",
            message: "id must be a positive integer",
        };
    }

    // Validate names
    if (typeof data.first_name !== "string" || typeof data.last_name !== "string") {
        return {
            id: "ERR_VALIDATION",
            message: "first_name and last_name must be strings",
        };
    }

    // Validate birthday
    const date = new Date(data.birthday);
    if (isNaN(date.getTime())) {
        return {
            id: "ERR_VALIDATION",
            message: "birthday must be a valid date",
        };
    }

    return null;
}

/*
Validate user id from URL params.
*/
export function validateUserIdParam(idParam) {
    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
        return {
            error: {
                id: "ERR_VALIDATION",
                message: "Invalid user id",
            },
        };
    }

    return { value: id };
}