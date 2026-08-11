import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Device name is required"],
            trim: true,
            minlength: [2, "Device name must be at least 2 characters"],
            maxlength: [50, "Device name cannot exceed 50 characters"]
        },

        hardwareToken: {
            type: String,
            required: [true, "Hardware token is required"],
            unique: true,
            trim: true,
            select: false
        },

        status: {
            type: String,
            enum: ["online", "offline", "idle"],
            default: "offline"
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Mobile owner is required"],
            index: true
        }
    },
    {
        timestamps: true
    }
);

const Mobile = mongoose.model("Mobile", mobileSchema);

export default Mobile;