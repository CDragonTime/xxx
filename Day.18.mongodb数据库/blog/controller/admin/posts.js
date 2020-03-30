var express = require('express');
var router = express.Router();
var db = require("../../models/db")
var article = require("../../models/article")

// 渲染后台文章列表页面
router.get('/', function (req, res, next) {
    // 需要返回分类信息
    article.selectAllArticle(function(data){
        console.log(data)
        res.render("admin/article_list",{"data":data})
    })
});

// 渲染后台添加文章页面
router.get('/add', function (req, res, next) {
    db.selectAllCats(function (result) {
        console.log(result)
        res.render("admin/article_add", {data: result})
    })
    // res.render("admin/article_add")
    // console.log("==============")
});//写添加的逻辑
router.post("/add", function (req, res, next) {
    console.log(req.body);
    let articleA ={
        "acat":req.body.cat,
        "atitle":req.body.atitle,
        "amain":req.body.amain,
        "acontent":req.body.acontent,
        "date":new Date()
    }
    article.insertArticle(articleA,function(result){
        if(result == "1"){
            res.send('插入成功了<a href="/admin/posts">查看文章</a>')
        }else{
            res.send('插入失败了<a href="/admin/posts">查看文章</a>')
        }
    })
})


module.exports = router;
