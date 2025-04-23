const { Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");

// Model imports
const DepartmentModel = require("./Department");
const EmployeeModel = require("./Employee");
const UserModel = require("./User");
const DesignationModel = require("./Designation");
const LeaveModel = require("./Leave");
const PayrollModel = require("./Payroll");
const PasswordResetModel = require("./passwordreset");
const Attendance = require("./Attendance"); // ✅ Import directly

// Initialize models (only if using factory-style)
const Department = DepartmentModel(sequelize, Sequelize.DataTypes);
const Employee = EmployeeModel(sequelize, Sequelize.DataTypes);
const User = UserModel(sequelize, Sequelize.DataTypes);
const Designation = DesignationModel(sequelize, Sequelize.DataTypes);
const Leave = LeaveModel(sequelize, Sequelize.DataTypes);
const Payroll = PayrollModel(sequelize, Sequelize.DataTypes);
const PasswordReset = PasswordResetModel(sequelize, Sequelize.DataTypes);

// Export
module.exports = {
  sequelize,
  syncDB: async () => {
    try {
      await sequelize.sync({ alter: true }); // ✅ Will create attendance table
      console.log("✅ All models synced!");
    } catch (error) {
      console.error("❌ DB Sync Error:", error);
    }
  },
  Department,
  Employee,
  User,
  Designation,
  Leave,
  Payroll,
  PasswordReset,
  Attendance, // ✅ Add it here
};
