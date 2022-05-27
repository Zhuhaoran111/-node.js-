// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库的 IP 地址
    user: 'root', // 登录数据库的账号
    password: '123456', // 登录数据库的密码
    database: 'my_db_01', // 指定要操作哪个数据库
    port: '3366',  //端口号
    //注意：这里的默认端口号是3306，如果不写的情况下，因为本机有两个服务器版本的数据库，所以必须指定不同的端口
})

// 向外共享 db 数据库连接对象
module.exports = db

