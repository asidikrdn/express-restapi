"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("logs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      ip_address: {
        type: Sequelize.STRING,
      },
      host: {
        type: Sequelize.STRING,
      },
      path: {
        type: Sequelize.STRING,
      },
      method: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING,
      },
      response_time: {
        type: Sequelize.STRING,
      },
      status_code: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("logs");
  },
};
