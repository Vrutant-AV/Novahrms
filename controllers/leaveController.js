const { Leave, Employee } = require('../models');
const { Op } = require('sequelize');
const { getEmployeeById } = require('./employeeController');

// Apply for a leave (Employee)
exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason, leaveType } = req.body;
    const employeeId = req.user.id;

    const newLeave = await Leave.create({
      employeeId,
      startDate,
      endDate,
      reason,
      leaveType,
      status: 'pending',
    });

    res.status(201).json({ message: 'Leave request submitted', leave: newLeave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all leave requests (Admin, HR, Manager)
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      include: [{ model: Employee, attributes: ['id', 'name', 'email', 'role'] }],
      order: [['createdAt', 'DESC']],
    });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific leave request by ID (Admin, HR, Manager)
exports.getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id, {
      include: [{ model: Employee, attributes: ['id', 'name', 'email', 'role'] }],
    });

    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update leave status (Admin, HR, Manager)
exports.updateLeave = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByPk(req.params.id);

    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    leave.status = status;
    await leave.save();

    res.json({ message: 'Leave status updated', leave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a leave request (Admin only)
exports.deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);

    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    await leave.destroy();

    res.json({ message: 'Leave request deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
