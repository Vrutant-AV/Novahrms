const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const { getCurrentUser } = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/users', authController.signup);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get('/me', authenticateToken, getCurrentUser);

router.get(
    '/admin-only',
    authenticateToken,
    authorizeRoles('admin'),
    (req, res) => {
        res.json({ message: 'Welcome Admin!' });
    }
);

router.post(
    '/manage-employees',
    authenticateToken,
    authorizeRoles('admin', 'hr', 'manager'),
    (req, res) => {
        res.json({ message: 'Allowed for admin/hr/manager' });
    }
);

module.exports = router;
