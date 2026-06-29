const mongoose = require("mongoose");

const featureFlagSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        featureKey: {
            type: String,
            required: true,
            trim: true,
        },
        enabled: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("FeatureFlag", featureFlagSchema);