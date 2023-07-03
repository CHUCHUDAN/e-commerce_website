const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const passport = require('./config/passport')

const SESSION_SECRET = 'secret'

app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

require('./routes')(app)

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})
