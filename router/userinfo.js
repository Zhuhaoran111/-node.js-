//导入express
const express = require('express')
const router = express.Router()

//挂载路由

//导入路由处理函数的模块在router_handler里面
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象----用户基本的信息--解构赋值
//在schema里面update_userinfo_schema, update_password_schema,update_avatar_schem
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

//1.获取用户基本的信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)

//2.更新用户信息的路由,更新才会设计到验证
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)


//3.更新密码的路由,三个参数，前面是路由发起的地址，中间是验证规则，后面是路由的处理函数
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)


//4.更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)


module.exports = router