import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import mobileRoutes from "./routes/mobile.routes.js";

import notFound from "./middleware/notfound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

// console.log(notFound)

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

// Parse JSON request bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Health check
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

// Routes
app.use(
    "/api/v1/auth",
    authRoutes
);

app.use(
    "/api/v1/mobiles",
    mobileRoutes
);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;