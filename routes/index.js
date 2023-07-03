const v1 = require('./v1')
module.exports = app => {
  app.use('/v1', v1)
  app.use('/', (req, res) => res.redirect('/v1'))
}
