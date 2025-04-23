module.exports = (sequelize, DataTypes) => {
    const Leave = sequelize.define("Leave", {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      leaveType: {
        type: DataTypes.STRING, // e.g., 'sick', 'casual', 'earned'
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
    });
  
    return Leave;
  };
  