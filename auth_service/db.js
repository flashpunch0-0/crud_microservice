const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ auth Database connected!");

    // Sync models with the database (creates tables if not exist)
    await sequelize.sync({ alter: true }); // or { force: true } to drop & recreate
    console.log("✅ auth Tables synced!");
  } catch (error) {
    console.error("❌ auth Database connection failed:", error);
  }
})();

module.exports = sequelize;
