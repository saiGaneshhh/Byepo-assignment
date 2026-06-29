const Organization = require("../models/Organization");

// Create Organization
const createOrganization = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Organization name is required",
            });
        }

        const existingOrganization = await Organization.findOne({ name });

        if (existingOrganization) {
            return res.status(409).json({
                success: false,
                message: "Organization already exists",
            });
        }

        const organization = await Organization.create({ name });

        return res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data: organization,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Organizations
const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: organizations.length,
            data: organizations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Organization By ID
const getOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: organization,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Organization
const updateOrganization = async (req, res) => {
    try {
        const { name } = req.body;

        const organization = await Organization.findById(req.params.id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        if (name) {
            const duplicate = await Organization.findOne({
                name,
                _id: { $ne: req.params.id },
            });

            if (duplicate) {
                return res.status(409).json({
                    success: false,
                    message: "Organization name already exists",
                });
            }

            organization.name = name;
        }

        await organization.save();

        return res.status(200).json({
            success: true,
            message: "Organization updated successfully",
            data: organization,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Organization
const deleteOrganization = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        await organization.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Organization deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
};