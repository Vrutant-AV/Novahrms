const { Employee, User } = require("../models");
const bcrypt = require("bcrypt");

console.log("Employee model:", Employee);

exports.createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
      dateOfJoining,
    } = req.body;

    // Step 1: Create Employee
    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
      dateOfJoining,
    });

    // Step 2: Create linked User account
    const hashedPassword = await bcrypt.hash("employee@123", 10);

    await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: "employee",
    });

    res.status(201).json({
      message: "Employee and user account created successfully.",
      employee,
    });
  } catch (err) {
    res.status(500).json({
      message: "Creation failed",
      error: err.message,
    });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Fetching failed", error: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Not found" });

    await employee.update(req.body);
    res.json({ message: "Updated", employee });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Not found" });

    await employee.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
