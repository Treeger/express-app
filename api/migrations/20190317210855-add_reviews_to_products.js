'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Products',
        'reviews',
        Sequelize.STRING
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Products',
        'reviews'
    );
  }
};
