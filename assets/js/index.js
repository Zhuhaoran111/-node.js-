$(function () {
    //调用getUserInfo获取用户的基本信息
    getUserInfo()
    const layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提示退出信息
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //1.清除本地存储的token
            localStorage.removeItem('token')
            //2.重新跳转到登陆页面
            location.href = '/login.html'

            //关闭confirm询问框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //表示请求头配置头像
        //以/my开头的请求路径，需要在请头中携带Authorization身份
        //认证字段，才能正常访问成功
        //baseapi已经统一配置
        // headers: {
        //     //只能有权限的用户才能访问，所以必须带token值
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar渲染用户头像
            renderAvator(res.data)

        },

        //下面代码全局挂载了
        //  complete: function (res) {
        //     //在complete回调函数中可以使用res.responseJSON拿到服务
        //     //响应回来的数据
        //     if (res.responseJSON.status === 1 || res.responseJSON.message === "身份认证失败！") {
        //         //1.强制清除token
        //         //2.墙砖跳转你到登陆页面
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }

        // }

    })
}


//渲染用户的头像
function renderAvator(user) {
    //1.获取用户的名称，昵称和用户名选一个，有昵称渲染昵称，没有则渲染用户名
    const name = user.nickname || user.username

    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)

    //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像attr??????????
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase()  //获取名字的第一个字符并转成大写
        $('.text-avatar').html(first).show()
    }
}
