'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING(3)
      },
      birth: {
        type: Sequelize.DATEONLY
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: 'https://i.imgur.com/BMxWxE8.jpeg'
      },
      background_image: {
        type: Sequelize.STRING,
        defaultValue: 'https://i.imgur.com/5ZDLPuU.jpeg'
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
    await queryInterface.dropTable('Users')
  }
}
