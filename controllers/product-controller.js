// const productService = require('../service/product-service')

module.exports = {
  // 首頁
  getProducts: (req, res, next) => {
    return res.render('products/products')
  }
}
