const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/performanceReviewController");

const { authenticateToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Create review
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager'),
  createReview
);

// Get all reviews
router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'hr'),
  getAllReviews
);

// Get review by ID
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager', 'team_lead', 'employee'),
  getReviewById
);

// Update review
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'hr', 'manager'),
  updateReview
);

// Delete review
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteReview
);

module.exports = router;
