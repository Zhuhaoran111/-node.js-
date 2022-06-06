$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;

    //定义一个查询的参数对象，将来请求的数据的时候
    //需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1,   //页码值，默认请求第一页的数据
        pagesize: 5, //每页显示的多少数据
        // cate_id: '',//文章分类的Id
        // state: '',//文章发布状态
    }




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
                console.log(res)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                //调用渲染分页的方法
                renderPage(res.total)
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
                    return layui.layer.msg('获取分类数据失败')
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


        //获取表单中下拉选中的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()



        //为查询参数对象q中对应的属性赋值
        if (cate_id) {
            q.cate_id = cate_id
        } else {
            delete q.cate_id
        }

        if (state) {
            q.state = state
        } else {
            delete q.state
        }

        //最新的筛选条件重新渲染表格的数据
        initTable()
    })

    //定义渲染分页的方法
    function renderPage(total) {

        //调用laypage.render()方法来渲染分页结构
        layui.laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示多少条数据
            curr: q.pagenum,//默认指定选中那一页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            //分页发生切换时，触发jump
            //其实有两种情况会触发jump回调(死循环)
            //1.点击页码调用，2.只要调用laypage.render()就会触发jump回调
            jump: function (obj, first) {
                //first为true就是第二种方式触发函数,不为true就是第一种能调函数

                console.log(obj.curr)   //拿到当前点击的第几页
                q.pagenum = obj.curr  //把最新的页面值赋值到q查询对象中，然后传给后台
                q.pagesize = obj.limit
                //把最新的条目数，赋值到q这个查询参数对象的Pagesize属性中


                //根据最新的q获取最新的列表
                // initTable()
                if (!first) {
                    initTable()
                }
            }
        })
    }
})