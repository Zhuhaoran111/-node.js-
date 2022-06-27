// const { $ } = require("@hapi/joi/lib/base")

// const { $ } = require("@hapi/joi/lib/base")



$(function () {
    //点击"去注册账号的链接(当前是在登录界面)
    $('#link_reg').on('click', function () {
        $('.login-box').hide()  //登陆页面隐藏
        $('.reg-box').show()   //注册界面显示
    })

    //点击去登陆的链接(当前是在注册界面)
    $('#link_login').on('click', function () {
        $('.login-box').show() //登陆页面显示
        $('.reg-box').hide()  //注册页面隐藏
    })

    //从layui获取form对象
    var form = layui.form
    //导出layer
    var layer = layui.layer
    //自定义校验规则pwd
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        //确认密码的校验规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    //监听注册表单事件
    //利用jquery发送ajax请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        console.log('aaa')
        //注意这里#form_reg和后面的 [name=username]必须有空格
        $.post('/api/reguser', data, function (res) {
            console.log('注册接口能走通吗')
            if (res.status !== 0) {
                return console.log(res.message)
                return layer.msg(res.message)
            }
            // console.log('注册成功')
            layer.msg('注册成功,请登录')
            //这里千万不能有return，一旦有了return ,下面的点击行为就不会执行了


            //模拟人的点击行为
            $('#link_login').click();


        })
    })

    $('#form_login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功!')
                //登录成功得到的token字符串，保存在localStorage中，今后用到可以去
                localStorage.setItem('token', res.token)
                //保存值是 localStorage.setItem(),获取值是 localStorage.getItem()
                console.log(res.token)
                //登录成功跳转到后台主页
                location.href = '/index.html'
            }
        })
    })


})