// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateUserRole, getAllUsers } = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// create user
router.post('/', userController.createUser);

// Route to update user role
router.put('/:id/role', authenticateToken, authorizeRoles('admin', 'hr'), updateUserRole);

// Optional: get all users
router.get('/', authenticateToken, authorizeRoles('admin', 'hr'), getAllUsers);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
