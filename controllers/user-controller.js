const userService = require('../service/user-service')
const { getUser } = require('../helpers/auth-helpers')

module.exports = {
  // 註冊頁面
  getRegisterPage: (req, res, next) => {
    try {
      return res.render('users/register', { css: 'register-login' })
    } catch (err) {
      next(err)
    }
  },
  // 註冊功能
  register: (req, res, next) => {
    userService.register(req, (err, data) => {
      if (err) return next(err)
      req.session.createdData = data
      req.flash('success_messages', '註冊成功!')
      return res.redirect('back')
    })
  },
  // 登入頁面
  getLoginPage: (req, res, next) => {
    try {
      return res.render('users/login', { css: 'register-login' })
    } catch (err) {
      next(err)
    }
  },
  // 登入功能
  login: (req, res) => {
    req.flash('success_messages', '登入成功！')
    res.redirect('/v1')
  },
  // 登出功能
  logout: (req, res) => {
    req.logout()
    req.flash('success_messages', '登出成功！')
    res.redirect('/v1/user/login')
  },
  // 使用者簡介頁面
  getUserProfile: (req, res, next) => {
    const { name, phone, gender, birth, avatar, backgroundImage } = getUser(req)

    return res.render('users/profile', { css: 'profile', name, phone, gender, birth, avatar, backgroundImage })
  }
}
