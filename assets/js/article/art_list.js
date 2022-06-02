$(function () {
    var layer = layui.layer
    var form = layui.form

    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //定义补0的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //定义一个查询的参数对象，将来请求的数据的时候
    //需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1,   //页码值，默认请求第一页的数据
        pagesize: 2, //每页显示的多少数据
        cate_id: '',//文章分类的Id
        state: '',//文章发布状态
    }
    initTable()
    initCate()

    //获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                //使用模板引擎渲染页面数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                //调用渲染分页的方法
                renderPage()
            }
        })
    }

    //初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }

                //调用模板引擎分类的可选项
                //使用模板引擎渲染页面数据
                var htmlStr = template('tpl-cate', res)
                //填充
                $('[name=cate_id]').html(htmlStr)
                form.render()  //通知layui重新渲染表单区域
            }
        })
    }

    //筛选表单提交事件(未完成)
    $('#form-search').on('submit', function (e) {
        e.preventDefault()


        //获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()


        //为查询参数对象q中对应的属性赋值
        q.cate_id = cate_id
        q.state = state

        //最新的筛选条件重新渲染表格的数据
        initTable()
    })

    //定义渲染分页的方法
    function renderPage() {

    }
})