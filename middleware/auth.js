const { ensureAuthenticated } = require('../helpers/auth-helpers')

// 檢查是否有登入權限
const authenticated = (req, res, next) => {
  try {
    if (ensureAuthenticated(req)) {
      return next()
    }
    req.flash('error_messages', '請先登入')
    return res.redirect('/v1/user/login')
  } catch (err) {
    next(err)
  }
}

const authenticatedRender = (req, res, next) => {
  try {
    if (ensureAuthenticated(req)) {
      return res.redirect('/')
    }
    return next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticated,
  authenticatedRender
}
