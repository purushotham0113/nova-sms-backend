import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            throw new ApiError(
                401,
                "Authentication required"
            );
        }

        const decoded = verifyToken(token);

        req.user = {
            id: decoded.sub
        };

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(
                new ApiError(
                    401,
                    "Authentication token has expired"
                )
            );
        }

        if (error.name === "JsonWebTokenError") {
            return next(
                new ApiError(
                    401,
                    "Invalid authentication token"
                )
            );
        }

        next(error);
    }
};