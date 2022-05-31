// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 导入并配置cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

//定义错误级别的中间件的包@hapi/joi已经启用
//如果postman中出现混合的错误，重新安装npm i joi 然后引入const joi = require('joi')
const joi = require('joi')

/* 配置表单数据的中间件 这个只能配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件*/
app.use(express.urlencoded({ extended: false }))

//中间件的编写一定要在路由之前，而不能在路由之后，把封装的函数放在
//中间件，中间件处理完，里面next会转交给路由去处理
app.use((req, res, next) => {
    //status默认值为1，表示失败的情况。
    //err可能是一个错误的对象，也可能是一个错误的描述字符串
    //这里在res上面挂在一个cc函数，只要是挂载了，外面的路由都能全局调用res.cc这个函数
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

/* --------------------------------------------- */
// 导入配置文件
const config = require('./config')
//路由之前配置解析Token的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
//这里的algorithms: ['HS256']可加可不加，需要了解其中的意思。
app.use(expressJWT({ secret: config.jwtSecretkey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))





/* ------------------------------------------------- */


// 1.导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)  //api是前缀，访问前缀


//2.导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)


//3.导入并使用文章分类的路由模块
const artCateRoutre = require('./router/artcate')
app.use('/my/article', artCateRoutre)




// 错误中间件
app.use((err, req, res, next) => {
    // 数据验证失败导入的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

    // 未知错误
    res.cc(err)
})



// 启动服务器npm i cors@2.8.5
app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})