'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Order, { foreignKey: 'user_id' })
      User.hasMany(models.Shopcar, { foreignKey: 'user_id' })
      User.hasMany(models.Like, { foreignKey: 'user_id' })
      User.hasMany(models.Comment, { foreignKey: 'user_id' })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    gender: DataTypes.STRING,
    birth: DataTypes.DATEONLY,
    avatar: DataTypes.STRING,
    backgroundImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
