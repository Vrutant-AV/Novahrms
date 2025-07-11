const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(authenticateToken);

// Create department (admin, hr)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  createDepartment
);

// Get all departments (all authenticated users)
router.get(
  '/',
  authenticateToken,
  getAllDepartments
);

// Get department by ID (all authenticated users)
router.get(
  '/:id',
  authenticateToken,
  getDepartmentById
);

// Update department (admin, hr)
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  updateDepartment
);

// Delete department (admin only)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteDepartment
);
module.exports = router;
