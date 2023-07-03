const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const { validation } = require('../../middleware/validation')
const { ErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')
const products = require('./modules/products')

// 註冊
router
  .route('/user/register')
  .get(userController.getRegisterPage)
  .post(validation, userController.register)

// 登入
router
  .route('/user/login')
  .get(userController.getLoginPage)
  .post(validation, passport.authenticate('local'), userController.login)

// 登出
router.get('/user/logout', userController.logout)

router.use('/products', products)
router.use('/', ErrorHandler)
module.exports = router
