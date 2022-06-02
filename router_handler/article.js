// 导入数据库操作模块
const db = require('../db/index')

//获取文章列表处理函数
exports.getArticleList = (req, res) => {
    // 导入数据库操作模块
    const sql = 'select * from ev_articles where is_delete=0 order by id asc'

    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results,
        })
    })
}


// 发布新文章的处理函数
exports.addArticle = (req, res) => {
    res.send('ok11')
}