import {
    registerUser,
    loginUser
} from "../services/auth.service.js";

import asyncHandler from "../utils/asyncHandler.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: 24 * 60 * 60 * 1000
};

export const register = asyncHandler(
    async (req, res) => {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const result = await registerUser({
            name,
            email,
            password
        });

        res.cookie(
            "authToken",
            result.token,
            cookieOptions
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: result.user
            }
        });
    }
);

export const login = asyncHandler(
    async (req, res) => {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const result = await loginUser({
            email,
            password
        });

        res.cookie(
            "authToken",
            result.token,
            cookieOptions
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: result.user
            }
        });
    }
);

export const logout = asyncHandler(
    async (req, res) => {
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "none"
                : "lax"
        });

        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    }
);