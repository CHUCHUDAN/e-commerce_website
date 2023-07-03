const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const productController = require('../../controllers/product-controller')
const { validation } = require('../../middleware/validation')
const { ErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')
const products = require('./modules/products')
const { authenticated, authenticatedRender } = require('../../middleware/auth')

// 註冊
router
  .route('/user/register')
  .get(authenticatedRender, userController.getRegisterPage)
  .post(validation, userController.register)

// 登入
router
  .route('/user/login')
  .get(authenticatedRender, userController.getLoginPage)
  .post(validation, passport.authenticate('local'), userController.login)

// 登出
router.get('/user/logout', userController.logout)

// 首頁
router.get('/', productController.getProducts)

router.use('/products', authenticated, products)
router.use('/', ErrorHandler)
module.exports = router
