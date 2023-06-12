const { Sequelize } = require("sequelize");
const credentials = require("../database/config/credentials");

const User = require("../database/models/User");

const NodeSequelize = new Sequelize(credentials);

User.init(NodeSequelize);

module.exports = NodeSequelize;
