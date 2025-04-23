// routes/payrollRoutes.js
const express = require("express");
const router = express.Router();

const {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
} = require("../controllers/payrollController");

const { authenticateToken, authorizeRoles } = require("../middleware/authMiddleware");

router.use(authenticateToken);

// Create payroll
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  createPayroll
);

// Get all payrolls
router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  getAllPayrolls
);

// Get single payroll
router.get(
  '/:id',
  authenticateToken,
  getPayrollById
);

// Update payroll
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  updatePayroll
);

// Delete payroll
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deletePayroll
);

module.exports = router;