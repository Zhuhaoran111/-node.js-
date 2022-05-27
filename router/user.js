const express = require('express')
// 创建路由对象
const router = express.Router()


// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user.js')


// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象(解构赋值)reg_login_schema里面就是一个验证规则
const { reg_login_schema } = require('../schema/user')


// 注册新用户
//expressJoi(reg_login_schema)把验证规则reg_login_schema传进去
//验证成功交给后面的userHandler.regUser进行处理，如果失败，则交给app.js一个全局的错误
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

// 将路由对象共享出去
module.exports = router


// const express = require('express')
// // 创建路由对象
// const router = express.Router()
//不是模块化编写的方式
// // 注册新用户
// router.post('/reguser', (req, res) => {
//     res.send('reguser OK')
// })

// // 登录
// router.post('/login', (req, res) => {
//     res.send('login OK')
// })

// // 将路由对象共享出去
// module.exports = router