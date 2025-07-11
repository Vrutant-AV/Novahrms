// models/Payroll.js
module.exports = (sequelize, DataTypes) => {
    const Payroll = sequelize.define("Payroll", {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      salaryMonth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      basicSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      bonuses: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      deductions: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      netSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM("pending", "paid"),
        defaultValue: "pending",
      },
    });
  
    return Payroll;
  };
  