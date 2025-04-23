module.exports = (sequelize, DataTypes) => {
    const PerformanceReview = sequelize.define("PerformanceReview", {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comments: {
        type: DataTypes.TEXT,
      },
    });
  
    return PerformanceReview;
  };
  