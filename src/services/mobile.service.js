import Mobile from "../models/Mobile.js";
import ApiError from "../utils/ApiError.js";

export const createMobile = async ({
    name,
    hardwareToken,
    owner
}) => {
    const mobile = await Mobile.create({
        name,
        hardwareToken,
        owner
    });

    return {
        id: mobile._id,
        name: mobile.name,
        status: mobile.status,
        owner: mobile.owner,
        createdAt: mobile.createdAt,
        updatedAt: mobile.updatedAt
    };
};

export const getUserMobiles = async (owner) => {
    return Mobile.find({ owner }).sort({
        createdAt: -1
    });
};

export const getMobileById = async (mobileId, owner) => {
    const mobile = await Mobile.findOne({
        _id: mobileId,
        owner
    });

    if (!mobile) {
        throw new ApiError(
            404,
            "Mobile device not found"
        );
    }

    return mobile;
};

export const updateMobile = async (
    mobileId,
    owner,
    updates
) => {
    const allowedUpdates = {};

    if (updates.name !== undefined) {
        allowedUpdates.name = updates.name;
    }

    if (updates.status !== undefined) {
        allowedUpdates.status = updates.status;
    }

    const mobile = await Mobile.findOneAndUpdate(
        {
            _id: mobileId,
            owner
        },
        allowedUpdates,
        {
            new: true,
            runValidators: true
        }
    );

    if (!mobile) {
        throw new ApiError(
            404,
            "Mobile device not found"
        );
    }

    return mobile;
};

export const deleteMobile = async (
    mobileId,
    owner
) => {
    const mobile = await Mobile.findOneAndDelete({
        _id: mobileId,
        owner
    });

    if (!mobile) {
        throw new ApiError(
            404,
            "Mobile device not found"
        );
    }
};