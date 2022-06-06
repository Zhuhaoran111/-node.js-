// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

//导入需要处理的函数模快
// 导入文章的路由处理函数模块
const article_handler = require('../router_handler/article')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径，解析formdata
const uploads = multer({ dest: path.join(__dirname, '../uploads') })

//// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象(解构赋值)reg_login_schema里面就是一个验证规则
const { list_article_schema, delete_article_schema, add_article_schema } = require('../schema/article')


//1.获取文章列表数据
router.get('/list', expressJoi(list_article_schema), article_handler.getArticleList)

//2.根据id删除文章列表数据
router.get('/deleteList/:id', expressJoi(delete_article_schema), article_handler.deleteArticleById)

/// 3.发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

// 向外共享路由对象
module.exports = router