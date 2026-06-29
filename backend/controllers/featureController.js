const FeatureFlag = require("../models/FeatureFlag");

// Create Feature Flag
const createFeatureFlag = async (req, res) => {
    try {
        const { featureKey, enabled } = req.body;

        if (!featureKey) {
            return res.status(400).json({
                success: false,
                message: "Feature key is required",
            });
        }

        const existingFeature = await FeatureFlag.findOne({
            organizationId: req.user.organizationId,
            featureKey,
        });

        if (existingFeature) {
            return res.status(409).json({
                success: false,
                message: "Feature already exists",
            });
        }

        const feature = await FeatureFlag.create({
            organizationId: req.user.organizationId,
            featureKey,
            enabled,
        });

        return res.status(201).json({
            success: true,
            message: "Feature created successfully",
            data: feature,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Features
const getAllFeatureFlags = async (req, res) => {
    try {
        const features = await FeatureFlag.find({
            organizationId: req.user.organizationId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: features.length,
            data: features,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Feature By ID
const getFeatureFlagById = async (req, res) => {
    try {
        const feature = await FeatureFlag.findOne({
            _id: req.params.id,
            organizationId: req.user.organizationId,
        });

        if (!feature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: feature,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Feature
const updateFeatureFlag = async (req, res) => {
    try {
        const { featureKey, enabled } = req.body;

        const feature = await FeatureFlag.findOne({
            _id: req.params.id,
            organizationId: req.user.organizationId,
        });

        if (!feature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found",
            });
        }

        if (featureKey) feature.featureKey = featureKey;
        if (enabled !== undefined) feature.enabled = enabled;

        await feature.save();

        return res.status(200).json({
            success: true,
            message: "Feature updated successfully",
            data: feature,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Feature
const deleteFeatureFlag = async (req, res) => {
    try {
        const feature = await FeatureFlag.findOne({
            _id: req.params.id,
            organizationId: req.user.organizationId,
        });

        if (!feature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found",
            });
        }

        await feature.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Feature deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Check Feature Status (End User)
const checkFeatureFlag = async (req, res) => {
    try {
        const { organizationId, featureKey } = req.body;

        if (!organizationId || !featureKey) {
            return res.status(400).json({
                success: false,
                message: "Organization ID and Feature Key are required",
            });
        }

        const feature = await FeatureFlag.findOne({
            organizationId,
            featureKey,
        });

        return res.status(200).json({
            success: true,
            enabled: feature ? feature.enabled : false,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    createFeatureFlag,
    getAllFeatureFlags,
    getFeatureFlagById,
    updateFeatureFlag,
    checkFeatureFlag,
    deleteFeatureFlag,
};