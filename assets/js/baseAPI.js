//注意：每次调用$.get()或者$.post()或 $.ajax()的时候,
//会先调用这个函数ajaxPrefilter
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options.url)  //这里面就是url后面地址/api/login
    //发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:3007' + options.url
    console.log(options.url)

    //统一的为有权限/my/的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            //只能有权限的用户才能访问，所以必须带token值
            Authorization: localStorage.getItem('token') || ''

        }
    }
    //全局同一挂载complete的回调函数
    //无论成功还是失败都会调用这个函数
    options.complete = function (res) {
        //在complete回调函数中可以使用res.responseJSON拿到服务
        //响应回来的数据
        if (res.responseJSON.status === 1 || res.responseJSON.message === "身份认证失败！") {
            //1.强制清除token
            //2.墙砖跳转你到登陆页面
            localStorage.removeItem('token')
            location.href = '/login.html'
        }

    }
})