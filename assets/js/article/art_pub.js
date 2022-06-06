


$(function () {
    var layer = layui.layer
    var form = layui.form
    //定义加载文章的分类的方法
    initCate()
    //初始化富文本编辑器
    initEditor()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类列表失败')
                }

                //调用模板引擎
                //使用模板引擎渲染页面数据
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()  //通知layui重新渲染表单区域
            }
        })
    }

    //初始化图片裁剪区
    var $image = $('#image')

    //裁剪选项
    var options = {
        aspectRatio: 400 / 200,
        preview: '.img-preview'
    }

    //初始化裁剪区域
    $image.cropper(options)



    //为封面的选择按钮绑定触发事件(弹出文件选择框)
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })


    //为文件选择框绑定change事件
    $('#coverFile').on('change', function (e) {
        //获取文件的列表数据
        var files = e.target.files
        //判断用户是否选择的图片
        if (files.length === 0) {
            return layui.layer.msg('请选择照片')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var newimgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newimgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    //定义文章的发布状态
    var art_state = '已发布'


    //为存为草稿按钮，绑定点击事件
    $('btnSave').on('click', function () {
        art_state = '草稿'
    })

    //为表单绑定submit提交事件
    $('#form-pub').on('submit', function (e) {
        //1.阻止表单的默认提交行为
        e.preventDefault()
        //2.基于form表单快速创建一个Formdata对象
        var fd = new FormData($(this)[0])

        //3,将文章的发布状态对象中追加state
        fd.append('state', art_state)

        //k是键也就是序号,v是值
        // fd.forEach(function (v, k) {
        //     console.log(k, v)
        // })

        //4.将封面的图片输出为一个文件对象
        $image.cropper('getCroppedCanvas', {
            //创建一个Canvas画布
            width: 400,
            height: 280,
        })
            .toBlob(function (blob) {
                //将Canvas画布上的内容转化为文件对象
                //5.得到文件对象后进行追加
                fd.append('cover_img', blob)

                // fd.forEach(function (v, k) {
                //     console.log(k, v)
                // })
                //6.发起ajax请求

                publishArticle(fd)

            })

    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            //注意：r如果向服务器提交的是formData格式的数据，
            //必须添加如下的两个配置项

            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                //发布成功h后跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }
})