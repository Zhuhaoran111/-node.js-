



$(function () {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()


    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            mathod: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    let indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            area: ['500px', '250px'],
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html(),
        });

    })
    //通过代理的形式，为form-add表单绑定submit事件
    //动态添加到页面上的元素绑定事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                //重新渲染列表数据
                initArtCateList()
                layer.msg('新增分类成功')
                //关闭袒弹出层
                layer.close(indexAdd)
            }

        })
    })

    //通过代理形式为btn-edit按钮绑定点击事件
    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            area: ['500px', '250px'],
            type: 1,
            title: '编辑文章分类',
            content: $('#dialog-edit').html(),
        });


        //attr是啥意思,这里是获取每个编辑按钮的id
        let id = $(this).attr('data-id')
        //发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    //通过代理的形式，为修改分类的表单绑定submit
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),  //拿到表中的数据
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新数据失败')
                }
                layer.msg('更新文章分类数据成功')
                layer.close(indexEdit)
                initArtCateList() //刷新数据

            }
        })
    })



    //通过代理的形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')   //拿到id的值

        //提示用户是否要删除
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index);
                    initArtCateList() //数据刷新
                }
            })


        });
    })
})

