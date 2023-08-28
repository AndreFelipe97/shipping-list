/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { hash } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'example@example.com',
        password: await hash('123456', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
