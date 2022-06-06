const joi = require('joi')

//1.下面是发布新文章的验证规则
const title = joi.string().required()   //字符串——必填项
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('草稿', '已发布').required()

//2.下面是获取文章类表数据的验证规则
const pagenum = joi.number().integer().min(0).required()
const pagesize = joi.number().integer().min(1).required()
const cate_id_optional = joi.number().integer().min(1).optional()
const state_optional = joi.string().valid('草稿', '已发布').optional()

//3.这是根据id删除，获取，更新文章列表数据
const id = joi.number().integer().min(1).required()


//向外暴露文文章列表数据验证规则
exports.list_article_schema = {
    query: {
        pagenum,
        pagesize,
        cate_id: cate_id_optional,
        state: state_optional
    }
}