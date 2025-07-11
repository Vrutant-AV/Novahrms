// controllers/payrollController.js
const { Payroll, Employee } = require("../models");

exports.createPayroll = async (req, res) => {
  try {
    const { employeeId, salaryMonth, basicSalary, bonuses, deductions } = req.body;

    const netSalary = basicSalary + (bonuses || 0) - (deductions || 0);

    const payroll = await Payroll.create({
      employeeId,
      salaryMonth,
      basicSalary,
      bonuses,
      deductions,
      netSalary,
    });

    res.status(201).json(payroll);
  } catch (error) {
    console.error("Payroll Creation Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.findAll({ include: ["Employee"] });
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findByPk(req.params.id);
    if (!payroll) return res.status(404).json({ message: "Payroll not found" });

    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updatePayroll = async (req, res) => {
  try {
    const { bonuses, deductions, paymentStatus } = req.body;

    const payroll = await Payroll.findByPk(req.params.id);
    if (!payroll) return res.status(404).json({ message: "Payroll not found" });

    if (bonuses !== undefined) payroll.bonuses = bonuses;
    if (deductions !== undefined) payroll.deductions = deductions;
    if (paymentStatus) payroll.paymentStatus = paymentStatus;

    payroll.netSalary = payroll.basicSalary + (payroll.bonuses || 0) - (payroll.deductions || 0);

    await payroll.save();

    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByPk(req.params.id);
    if (!payroll) return res.status(404).json({ message: "Payroll not found" });

    await payroll.destroy();
    res.json({ message: "Payroll deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
