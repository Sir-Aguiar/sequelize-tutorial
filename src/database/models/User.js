const { DataTypes } = require("sequelize");
const NodeSequelize = require("../database");

const User = NodeSequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: DataTypes.STRING,
});

module.exports = User;
