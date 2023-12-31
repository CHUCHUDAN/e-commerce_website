'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      inventory_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING
      },
      standard: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      place_of_production: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products')
  }
}
