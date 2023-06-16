const { Sequelize } = require("sequelize");
const credentials = require("../database/config/credentials");

const NodeSequelize = new Sequelize(credentials);

module.exports = NodeSequelize;
