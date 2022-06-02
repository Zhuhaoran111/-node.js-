// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

//导入需要处理的函数模快
// 导入文章的路由处理函数模块
const article_handler = require('../router_handler/article')


//1.获取文章列表数据
router.get('/list', article_handler.getArticleList)


// 发布新文章
router.post('/add', article_handler.addArticle)

// 向外共享路由对象
module.exports = router