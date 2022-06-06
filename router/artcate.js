//导入express
const express = require('express')
const req = require('express/lib/request')

//创建路由
const router = express.Router()

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handler/artcate')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象(解构赋值)reg_login_schema里面就是一个验证规则
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')




//1.获取文章分类列表数据的路由,调用路由，并执行后面的处理函数
router.get('/cates', artcate_handler.getArticleCates)

//2.新增文章分类的路由,调用路由，并执行后面的处理函数
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

//3.删除文章分类的路由:id动态的id
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

//4.根据id获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById)

//5.根据更新文章分类的路由

router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)



// 向外共享路由对象
module.exports = router