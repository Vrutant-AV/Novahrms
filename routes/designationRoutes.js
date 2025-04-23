const express = require("express");
const router = express.Router();

const {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
} = require("../controllers/designationController");

const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(authenticateToken);

// Create Designation (admin, hr)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  createDesignation
);

// Get All Designations (all logged-in users)
router.get(
  '/',
  authenticateToken,
  getAllDesignations
);

// Get Designation by ID (all logged-in users)
router.get(
  '/:id',
  authenticateToken,
  getDesignationById
);

// Update Designation (admin, hr)
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  updateDesignation
);

// Delete Designation (admin only)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteDesignation
);
module.exports = router;
