


$(function () {

    //添加表单数据验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo();

    //发送ajax请求
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                //0成功，1失败，不等与0就是失败的
                if (res.status !== 0) {
                    return layer.msg('获取信息失败！')
                }
                console.log(res)
                //调用form.val()为表单赋值，这个是在form表单上指定lay-filter="formUserInfo"  ，然后res.data通过name去赋值
                form.val('formUserInfo', res.data)
            }
        })
    }


    //重置表单
    $('#btnReset').on('click', function (e) {
        //阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    })


    //更新用户信息的请求
    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单的默认重置行为
        e.preventDefault()
        //更新用户发起请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),  //拿到表单所填写的数据
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户失败！')
                }
                layer.msg('更新用户成功！')
                //调用父页面的方法，重新渲染用户头像和用户的信息(重点) window.parent
                window.parent.getUserInfo()
            }
        })
    })



})