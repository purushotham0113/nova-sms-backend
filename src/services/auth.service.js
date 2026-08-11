import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(
            409,
            "User with this email already exists"
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(user._id.toString());

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token
    };
};

export const loginUser = async ({ email, password }) => {
    const user = await User
        .findOne({ email })
        .select("+password");

    if (!user) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    const token = generateToken(user._id.toString());

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token
    };
};