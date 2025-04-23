const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL successfully.");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
};

module.exports = {
  sequelize,
  DataTypes,
  testConnection,
};
