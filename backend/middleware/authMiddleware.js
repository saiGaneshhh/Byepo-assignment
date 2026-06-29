const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token missing.",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

// Only Super Admin
const superAdminOnly = (req, res, next) => {
    if (req.user.role !== "superadmin") {
        return res.status(403).json({
            success: false,
            message: "Only Super Admin can access this resource.",
        });
    }

    next();
};

// Only Organization Admin
const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Only Organization Admin can access this resource.",
        });
    }

    next();
};

module.exports = {
    protect,
    superAdminOnly,
    adminOnly,
};