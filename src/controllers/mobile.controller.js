import {
    createMobile,
    getUserMobiles,
    getMobileById,
    updateMobile,
    deleteMobile
} from "../services/mobile.service.js";

import asyncHandler from "../utils/asyncHandler.js";

export const addMobile = asyncHandler(
    async (req, res) => {
        const {
            name,
            hardwareToken
        } = req.body;

        if (!name || !hardwareToken) {
            return res.status(400).json({
                success: false,
                message: "Device name and hardware token are required"
            });
        }

        const mobile = await createMobile({
            name,
            hardwareToken,
            owner: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Mobile device added successfully",
            data: {
                mobile
            }
        });
    }
);

export const getMobiles = asyncHandler(
    async (req, res) => {
        const mobiles = await getUserMobiles(
            req.user.id
        );

        res.status(200).json({
            success: true,
            data: {
                mobiles
            }
        });
    }
);

export const getMobile = asyncHandler(
    async (req, res) => {
        const mobile = await getMobileById(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            success: true,
            data: {
                mobile
            }
        });
    }
);

export const updateMobileController = asyncHandler(
    async (req, res) => {
        const mobile = await updateMobile(
            req.params.id,
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Mobile device updated successfully",
            data: {
                mobile
            }
        });
    }
);

export const deleteMobileController = asyncHandler(
    async (req, res) => {
        await deleteMobile(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Mobile device deleted successfully"
        });
    }
);