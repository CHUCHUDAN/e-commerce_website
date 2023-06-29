const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app
  .route('/')
  .get((req, res) => {
    res.send('hello')
  })

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})
