'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Product.hasMany(models.Order, { foreignKey: 'product_id' })
      Product.hasMany(models.Shopcar, { foreignKey: 'product_id' })
      Product.hasMany(models.Like, { foreignKey: 'product_id' })
      Product.hasMany(models.Comment, { foreignKey: 'product_id' })
      Product.belongsTo(models.Category, { foreignKey: 'category_id' })
    }
  };
  Product.init({
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    inventory_quantity: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    brand: DataTypes.STRING,
    standard: DataTypes.STRING,
    description: DataTypes.TEXT,
    place_of_production: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  })
  return Product
}
