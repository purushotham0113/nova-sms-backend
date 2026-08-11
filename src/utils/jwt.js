import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    return jwt.sign(
        {
            sub: userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
};