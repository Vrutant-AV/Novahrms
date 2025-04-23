const bcrypt = require("bcryptjs");
const { User, PasswordReset } = require("../models"); 
const jwt = require('jsonwebtoken');
const generateToken = require("../utils/generateToken");
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { Op } = require('sequelize');

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'employee'; // default role

    // 1. Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new user with hashed password
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 4. Generate token
    const token = generateToken(newUser);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await PasswordReset.create({ email, token, expiresAt });

    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;
    await sendEmail(email, 'Password Reset Request', `Click to reset: ${resetLink}`);

    res.json({ message: 'Password reset link sent to email' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  console.log('🔎 Incoming reset password request:', { email, token, newPassword });

  if (!email || !token || !newPassword) {
    return res.status(400).json({ error: 'Email, token, and new password are required' });
  }

  try {
    const resetRecord = await PasswordReset.findOne({
      where: { email, token },
    });

    if (!resetRecord || resetRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { email } });
    await PasswordReset.destroy({ where: { email } });

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
