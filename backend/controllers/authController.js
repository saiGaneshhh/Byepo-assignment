const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const superAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email !== process.env.SUPER_ADMIN_EMAIL ||
            password !== process.env.SUPER_ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const token = generateToken({
            id: "super-admin",
            role: "superadmin",
        });

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: "super-admin",
                name: "Super Admin",
                email: process.env.SUPER_ADMIN_EMAIL,
                role: "superadmin",
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const adminSignup = async (req, res) => {
    try {
        const { name, email, password, organizationId } = req.body;

        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            organizationId,
        });

        res.status(201).json({
            success: true,
            message: "Signup Successful",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const token = generateToken({
            id: user._id,
            organizationId: user.organizationId,
            role: user.role,
        });

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    superAdminLogin,
    adminSignup,
    adminLogin,
};
