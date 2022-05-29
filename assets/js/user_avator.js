
$(function () {

    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比,指的是形状4/3
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //为上传按钮模拟卷点击事件——声东击西
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    //为文件选择框绑定change事件
    $('#file').on('change', function (e) {
        var fileList = e.target.files
        console.log(fileList)
        if (fileList.length === 0) {
            return layui.layer.msg('请选择照片')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    //为确定按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        //1.拿到用户裁剪的头像
        // 并将 canvas 画布的内容转化为 base 64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')


        //调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更换头像失败')
                }
                layui.layer.msg('更换头像成功')
                window.parent.getUserInfo()  //父窗口的页面重新渲染
            }
        })
    })
})