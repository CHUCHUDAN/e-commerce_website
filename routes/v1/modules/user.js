const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/user-controller')

// 使用者簡介
router.get('/profile', userController.getUserProfile)

module.exports = router
