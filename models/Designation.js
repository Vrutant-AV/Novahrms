module.exports = (sequelize, DataTypes) => {
    const Designation = sequelize.define("Designation", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  
    return Designation;
  };
  