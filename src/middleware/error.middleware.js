const errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;

        const errors = Object.values(err.errors).map(
            (error) => ({
                field: error.path,
                message: error.message
            })
        );

        return res.status(statusCode).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource ID";
    }

    // MongoDB duplicate key
    if (err.code === 11000) {
        statusCode = 409;

        const field = Object.keys(
            err.keyPattern || {}
        )[0];

        message = `${field} already exists`;
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

export default errorHandler;