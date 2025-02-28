const { Sequelize } = require("sequelize");

require("dotenv").config();

const isTestEnv = process.env.NODE_ENV === "test2";

// ✅ Use SQLite for tests, PostgreSQL for normal execution
const sequelize = isTestEnv
  ? new Sequelize("sqlite::memory:", { logging: false })
  : new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
    });
if (!isTestEnv) {
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
}

module.exports = sequelize;
