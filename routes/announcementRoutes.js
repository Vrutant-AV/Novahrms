const express = require("express");
const router = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

const { authenticateToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Create announcement
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  createAnnouncement
);

// Get all announcements
router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager', 'team_lead', 'employee'),
  getAllAnnouncements
);

// Get single announcement
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager', 'team_lead', 'employee'),
  getAnnouncementById
);

// Update announcement
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  updateAnnouncement
);

// Delete announcement
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteAnnouncement
);

module.exports = router;
