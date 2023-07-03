const userService = require('../service/user-service')

module.exports = {
  // 註冊頁面
  getRegisterPage: (req, res, next) => {
    try {
      return res.render('users/register', { css: 'register' })
    } catch (err) {
      next(err)
    }
  },
  // 註冊功能
  postUser: (req, res, next) => {
    userService.postUser(req, (err, data) => {
      if (err) return next(err)
      req.session.createdData = data
      req.flash('success_messages', '註冊成功!')
      return res.redirect('back')
    })
  }
}
