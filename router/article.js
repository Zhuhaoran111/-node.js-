// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

//导入需要处理的函数模快
// 导入文章的路由处理函数模块
const article_handler = require('../router_handler/article')

//// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象(解构赋值)reg_login_schema里面就是一个验证规则
const { list_article_schema, delete_article_schema } = require('../schema/article')

// 解析form-data表单数据
// const multer = require('multer')
// const path = require('path')
// const upload = multer({ dest: path.join(__dirname, '../uploads') })


//1.获取文章列表数据
router.get('/list', expressJoi(list_article_schema), article_handler.getArticleList)

//2.根据id删除文章列表数据
router.get('/deleteList/:id', expressJoi(delete_article_schema), article_handler.deleteArticleById)

// 发布新文章
router.post('/add', article_handler.addArticle)

// 向外共享路由对象
module.exports = router