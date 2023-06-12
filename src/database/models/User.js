const { Model, DataTypes } = require("sequelize");

class User extends Model {
  // O parâmetro recebido é uma instancia de Sequelize, ou seja, a conexão com a DB
  static init(sequelize) {
    super.init({ name: DataTypes.STRING(255) }, { sequelize });
  }
}

module.exports = User;
