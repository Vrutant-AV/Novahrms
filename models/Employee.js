// models/Employee.js
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfJoining: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  });

  return Employee;
};
