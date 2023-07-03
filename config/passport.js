const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { CustomError } = require('../helpers/error-builder')

// set up Passport strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  // authenticate user
  async (email, password, cb) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) throw new CustomError('帳號或密碼輸入錯誤！', 400)
      const res = await bcrypt.compare(password, user.password)
      if (!res) throw new CustomError('帳號或密碼輸入錯誤！', 400)
      return cb(null, user)
    } catch (err) {
      return cb(err)
    }
  }
))

// serialize and deserialize user
passport.serializeUser((user, cb) => {
  try {
    return cb(null, user.id)
  } catch (err) {
    return cb(err)
  }
})
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id)
    return cb(null, user.toJSON())
  } catch (err) {
    return cb(err)
  }
})
module.exports = passport
