const express = require("express");
const router = express.Router();

const {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
} = require("../controllers/organizationController");

const {
    protect,
    superAdminOnly,
} = require("../middleware/authMiddleware");

/*
|--------------------------------------------------------------------------
| Public Route (For End User Feature Checker)
|--------------------------------------------------------------------------
*/

router.get("/public", getAllOrganizations);

/*
|--------------------------------------------------------------------------
| Super Admin Routes
|--------------------------------------------------------------------------
*/

router.post(
    "/create",
    protect,
    superAdminOnly,
    createOrganization
);

router.get(
    "/all",
    protect,
    superAdminOnly,
    getAllOrganizations
);

router.get(
    "/:id",
    protect,
    superAdminOnly,
    getOrganizationById
);

router.put(
    "/update/:id",
    protect,
    superAdminOnly,
    updateOrganization
);

router.delete(
    "/delete/:id",
    protect,
    superAdminOnly,
    deleteOrganization
);

module.exports = router;