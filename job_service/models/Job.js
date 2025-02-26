const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Job = sequelize.define("Job", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("applied", "interview", "offer", "rejected"),
    defaultValue: "applied",
  },
});

module.exports = Job;
