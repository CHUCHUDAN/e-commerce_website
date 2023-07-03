const productService = require('../service/product-service')

module.exports = {
  // 首頁
  getProducts: (req, res, next) => {
    res.send('歡迎光臨')
  }
}
