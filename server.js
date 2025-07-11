require("dotenv").config();
const app = require("./app");
const { sequelize, syncDB } = require("./models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL successfully.");
    await syncDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err.message);
  }
};

startServer();
