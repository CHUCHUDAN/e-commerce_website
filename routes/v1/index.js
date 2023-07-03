const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const { validation } = require('../../middleware/validation')
const { ErrorHandler } = require('../../middleware/error-handler')

// 註冊
router
  .route('/user/register')
  .get(userController.getRegisterPage)
  .post(validation, userController.postUser)

// 登入
router
  .route('/user/login')
  .get(userController.getLoginPage)

router.use('/', ErrorHandler)
module.exports = router
