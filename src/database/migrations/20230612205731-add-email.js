"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("users", "email", {
      type: Sequelize.STRING(255),
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("users", "email");
  },
};

