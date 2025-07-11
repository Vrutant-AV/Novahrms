module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("Department", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  
    return Department;
  };
  