const db = require("../models");
const PerformanceReview = db.PerformanceReview;

exports.createReview = async (req, res) => {
  try {
    const review = await PerformanceReview.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await PerformanceReview.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  const { id } = req.params;
  const userRole = req.user.role;
  const userId = req.user.id;

  try {
    const review = await PerformanceReview.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Performance review not found' });
    }

    // Allow employees to view only their own review
    if (userRole === 'employee' && review.employeeId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await PerformanceReview.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    await review.update(req.body);
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await PerformanceReview.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
