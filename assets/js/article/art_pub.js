
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

    //为封面的选择按钮绑定触发事件

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })


    //为文件选择框绑定change事件
    $('#coverFile').on('change', function (e) {
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





})