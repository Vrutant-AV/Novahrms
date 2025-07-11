const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Apply for Leave (employee)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('employee'),
  leaveController.applyLeave
);

// Get All Leave Requests (admin, hr, manager)
router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager'),
  leaveController.getAllLeaves
);

// Get Single Leave Request (admin, hr, manager)
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager'),
  leaveController.getLeaveById
);

// Update Leave Request (admin, hr)
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  leaveController.updateLeave
);

// Delete Leave Request (admin)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  leaveController.deleteLeave
);

module.exports = router;
