import express from "express";

import {
    addMobile,
    getMobiles,
    getMobile,
    updateMobileController,
    deleteMobileController
} from "../controllers/mobile.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// All mobile routes require authentication
router.use(authenticate);

router.post("/", addMobile);

router.get("/", getMobiles);

router.get("/:id", getMobile);

router.patch("/:id", updateMobileController);

router.delete("/:id", deleteMobileController);

export default router;