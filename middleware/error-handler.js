const { CustomError } = require('../helpers/error-builder')
module.exports = {
  ErrorHandler (err, req, res, next) {
    if (err instanceof CustomError) {
      req.flash('error_messages', `${err.name} : ${err.message}`)
      return res
        .status(err.status || 500)
        .redirect('back')
    } else {
      req.flash('error_messages', '伺服器錯誤')
      return res
        .status(500)
        .redirect('back')
    }
  }
}
