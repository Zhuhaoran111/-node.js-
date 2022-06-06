// 导入数据库操作模块
const db = require('../db/index')
const path = require('path')

//获取文章列表处理函数
exports.getArticleList = async (req, res) => {
    // 导入数据库操作模块
    const sql = `select a.Id, a.title, a.pub_date, a.state, b.name as cate_name
                from ev_articles as a,ev_article_cate as b 
                where a.cate_id = b.Id and a.cate_id = ifnull(?, a.cate_id)  and a.state = ifnull(?, a.state) and a.is_delete = 0  limit ?,?`
    /* 后面少了,?导致文章列表一上来不显示 */


    let results = []
    try {
        console.log(req)
        results = await db.queryByPromisify(sql, [req.query.cate_id || null, req.query.state || null, (req.query.pagenum - 1) * req.query.pagesize, req.query.pagesize])
        console.log(results);
    } catch (e) {
        return res.cc(e)
    }

    const countSql = 'select * from ev_articles where is_delete = 0'
    let total = null
    try {
        total = await db.queryByPromisify(countSql)
    } catch (e) {
        return res.cc(e)
    }

    res.send({
        status: 0,
        msg: '获取文章列表成功了',
        data: results,
        total: total.length
    })
}

//根据id删除文章列表的函数
exports.deleteArticleById = (req, res) => {
    //根据id修改删除数据，但数据库不是真正的删除，只是为is_delete做个标识
    const sql = `update ev_articles set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        //查找失败，返回错误信息
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章列表失败')

        //删除文章列表成功
        res.cc('删除文章列表成功', 0)
        //传的这个0至关重要，不加的话强点击删除会强制到登陆
    })
}


// 发布新文章的处理函数
exports.addArticle = (req, res) => {
    res.send('ok11')
}