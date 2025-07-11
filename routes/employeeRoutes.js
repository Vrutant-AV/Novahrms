const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(authenticateToken);

// Create Employee (admin, hr)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  createEmployee
);

// Get All Employees (admin, hr, manager)
router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager'),
  getAllEmployees
);

// Get Employee by ID (admin, hr, manager)
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager'),
  getEmployeeById
);

// Update Employee (admin, hr)
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  updateEmployee
);

// Delete Employee (admin)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteEmployee
);
module.exports = router;
