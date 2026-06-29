const express = require("express");
const router = express.Router();

const {
    createFeatureFlag,
    getAllFeatureFlags,
    getFeatureFlagById,
    updateFeatureFlag,
    deleteFeatureFlag,
    checkFeatureFlag,
} = require("../controllers/featureController");

const {
    protect,
    adminOnly,
} = require("../middleware/authMiddleware");

router.post("/create", protect, adminOnly, createFeatureFlag);

router.get("/all", protect, adminOnly, getAllFeatureFlags);

router.get("/:id", protect, adminOnly, getFeatureFlagById);

router.put("/update/:id", protect, adminOnly, updateFeatureFlag);

router.delete("/delete/:id", protect, adminOnly, deleteFeatureFlag);

router.post("/check", checkFeatureFlag);

module.exports = router;