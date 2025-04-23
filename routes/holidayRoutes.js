const express = require("express");
const router = express.Router();
const {
  createHoliday,
  getAllHolidays,
  getHolidayById,
  updateHoliday,
  deleteHoliday,
} = require("../controllers/holidayController");

const { authenticateToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Create holiday
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  createHoliday
);

// Get all holidays
router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager', 'team_lead', 'employee'),
  getAllHolidays
);

// Get single holiday
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager', 'team_lead', 'employee'),
  getHolidayById
);

// Update holiday
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  updateHoliday
);

// Delete holiday
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteHoliday
);

module.exports = router;
