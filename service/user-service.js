const { User } = require('../models')
const { CustomError } = require('../helpers/error-builder')
const bcrypt = require('bcryptjs')

module.exports = {
  // 註冊功能
  postUser: async (req, cb) => {
    try {
      const { name, email, password } = req.body
      const userEmail = await User.findOne({ where: { email } })
      if (userEmail) throw new CustomError('信箱已重複註冊', 400)
      const hash = await bcrypt.hash(password, 10)
      const createdUser = await User.create({
        name,
        email,
        role: 'user',
        password: hash
      })
      return cb(null, createdUser)
    } catch (err) {
      return cb(err)
    }
  }
}
