/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

//导入数据库操作模块
const db = require('../db/index')

//导入bcrypt加密这个包
const bcrypt = require('bcryptjs')

//2.导入生成token这个包
const jwt = require('jsonwebtoken')

//3.导入全局密钥的包
const config = require('../config')

// 注册用户的处理函数
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的数据req.body
    const userinfo = req.body
    //对表单中的数据进行合法性的校验
    if (!userinfo.username || !userinfo.password) {
        // return res.send({ status: 1, message: '用户名或密码不能为空！' })
        return res.cc('用户名或密码不能为空！')
    }


    //定义sql语句，查询用户名是否被占用
    //查询出来的这个用户名的legth!=0时就说明，用户名占用，=0就说明可使用
    const sql = 'select * from ev_users where username=?'

    db.query(sql, userinfo.username, (err, results) => {
        // 1.执行 SQL 语句失败
        if (err) {
            //下面是没有封装的res.send写法
            // return res.send({ status: 1, message: err.message })
            //下面是封装的res.send写法
            return res.cc(err)
        }
        // 2.用户名被占用,这里的用的是查询语句，results必然是一个数组，数组中会包符号条件的数据项，如果没有同样的用户数组长度为0
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        //用户名可以使用
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串，10代表安全性

        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // return res.send({ status: 0, message: '注册成功' })

        //插入新用户sql语句
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // 执行 SQL 语句失败
            if (err)
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            // res.send({ status: 0, message: '注册成功！' })
            return res.cc('注册成功！', 0)

        })


    })
}



// 登录的处理函数
exports.login = (req, res) => {
    //接受表单的数据
    const userinfo = req.body
    //定义sql语句
    const sql = 'select * from ev_users where username=?'
    //执行sql语句，根据用户名 查查询用户信息
    db.query(sql, userinfo.username, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语句成功，但是获取的条数不等于1
        if (results.length !== 1) return res.cc('登录失败')
        //下面是判断密码是否正确

        //关于res.send提上来的原因
        //1.因为不能发送两次res.send，提上去了return不会在执行后面的res.send
        //2.如果不提上去，db.query就是同级,程序执行完db.query里卖弄的res.cc后，继续执行最后那个
        //res.send,就相当于两次执行了res.send就会报错
        // res.send('login OK')

        //判断密码是否正确
        // 拿着用户输入的密码userinfo.password,和数据库中存储的密码results[0].password进行对比
        //注意：这里只会对加密的密码进行对比，不加密的不会进行对比----------------------
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败！')
        }

        // TODO：登录成功，生成 Token 字符串
        //1.清楚头像和密码的敏感信息
        const user = { ...results[0], password: '', user_pic: '' }


        //4,对用户的信息进行加密，生成token字符串
        //user:加密的用户对象
        //config.jwtSecretkey 加密的密钥值
        const tokenStr = jwt.sign(user, config.jwtSecretkey, { expiresIn: config.expiresIn })

        //5.调用res.send()将token值响应给客户端
        res.send({
            status: 0,
            message: '登录成功!',
            token: 'Bearer ' + tokenStr
            //'Bearer '表示一个前置，方便客户端的使用

        })
    })

}