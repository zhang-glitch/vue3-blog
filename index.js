const express = require('express')
const fs = require('fs')
const compression = require('compression')

const app = express()

app.use(compression())

app.use(express.static('./vue-blog/dist'))

const listener = app.listen(3001, '0.0.0.0', function () {
  console.log('====3000', listener.address().port)
})
