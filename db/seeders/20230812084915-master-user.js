"use strict";

const uuid = require("uuid");
const { hashPassword } = require("../../src/pkg/helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "mst_users",
      [
        {
          id: uuid.v4(),
          fullname: "Superadmin",
          role_id: 1,
          email: process.env.SUPERADMIN_EMAIL,
          is_email_verified: true,
          password: await hashPassword(process.env.SUPERADMIN_PASSWORD, 11),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
