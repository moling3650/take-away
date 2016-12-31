var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()

router.get('', function (req, res, next) {
  req.url = '/index.html'
  next()
})

app.use(router)

// 读取模拟数据
var appData = require('./data.json')

// 定义api的路由
var apiRoutes = express.Router()

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: appData.seller
  })
})

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: appData.goods
  })
})

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: appData.ratings
  })
})

// 注册api路由
app.use('/api', apiRoutes)

// 注册静态资源
app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
