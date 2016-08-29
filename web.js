var mysql = require('./common/mysql')
var express = require('express')
var config = require('./config')

var masterPool = mysql.getPool();

var app = express();

app.get('/', function (req, res) {
  res.send('hello')
})

// 正式的环境中，此处应该用 post 而非 get。此处用 get 方便浏览器调试
app.get('/short_url', function (req, res, next) {
  var original_url = req.query.url;

  // original_url 不重复时插入新记录，重复时什么都不做
  masterPool.query(`insert into short_url (original_url) values (?) on duplicate key update id=id`, [original_url], function (err, result) {
    if (err) {
      return next(err)
    }

    var insertId = result.insertId

    // insertId 为 0，说明是新记录。可以直接返回
    if (insertId) {
      return res.send({
        short_url: config.short_url_base + '/s/' + insertId
      })
    }

    // 找出 original_url 对应的老记录
    masterPool.query(`select id from short_url where original_url = ?`, [original_url], function (err, result) {
      if (err) {
        return next(err);
      }

      res.send({
        short_url: config.short_url_base + '/s/' + result[0].id,
      })
    })

  })
})

app.get('/s/:short_id', function (req, res, next) {
  var short_id = req.params.short_id

  masterPool.query(`select id, original_url from short_url where id = ?`, [short_id], function (err, result) {
    if (err) {
      return next(err);
    }
    if (result.length == 0) { // 如果对应的 short_id 不存在
      return res.status(404).send('not found')
    }

    res.redirect(result[0].original_url)
  })
})

app.listen(config.web_port, function () {
  console.log(`project 3 is listening at port ${config.web_port}`)
})
