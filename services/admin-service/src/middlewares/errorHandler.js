/*
Global error handling middleware.
This middleware ensures all errors return JSON responses.
*/
export function errorHandler(err, req, res, next) {
    // Handle application-defined errors
    if (err.id && err.statusCode) {
        return res.status(err.statusCode).json({
            id: err.id,
            message: err.message,
        });
    }

    // Handle unexpected errors
    return res.status(500).json({
        id: "ERR_INTERNAL",
        message: "Internal server error",
    });
}