//导入数据库操作模块
const db = require('../db/index')

//获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'

    //调用db.query()执行sql语句
    db.query(sql, req.user.id, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语句成功，但是查询的结果可能为空
        if (results.length != 1) return res.cc('获取用户信息失败')

        //用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}
//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    //定义待执行的 SQL 语句
    const sql = `update ev_users set ? where id=?`

    //调用 db.query() 执行 SQL 语句并传参
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')

        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
    })
}