# node-project-3

## 目录结构

```
./web.js -- web应用主程序
./sqls -- 建表语句
./config.js -- 配置文件
  mysql_master -- mysql相关配置
  web_port -- web应用监听端口
  short_url_base -- 线上部署的host地址
./common/mysql.js -- mysql 实例
```

## 启动命令

`node web.js`

## 测试语句

添加：`http://119.29.235.64:3000/short_url?url=http://qq.com`

访问：`http://119.29.235.64:3000/s/15`
