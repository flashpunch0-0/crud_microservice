const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // Disable logging SQL queries in console
  }
);
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    // Sync models with the database (creates tables if not exist)
    await sequelize.sync({ alter: true }); // or { force: true } to drop & recreate
    console.log("✅ Tables synced!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

module.exports = sequelize;
