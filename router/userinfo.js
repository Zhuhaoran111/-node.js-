//导入express
const express = require('express')
const router = express.Router()

//挂载路由

//导入理由处理函数的模块
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象----用户基本的信息--解构赋值
const { update_userinfo_schema } = require('../schema/user')

//获取用户基本的信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)

//更新用户信息的路由,更新才会设计到验证
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

module.exports = router