var mysql = require('mysql')
var config = require('../config')
var masterPool = mysql.createPool(config.mysql_master)

exports.getPool = function () {
  return masterPool;
}
