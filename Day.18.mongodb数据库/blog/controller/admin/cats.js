var express = require('express');
var db = require("../../models/db")
var router = express.Router();

// 渲染后台分类列表页面
router.get('/', function (req, res, next) {
    db.selectAllCats(function (result) {
        console.log(result)
        res.render("admin/category_list", { data: result })
    })
});

// 渲染后台添加分类页面
router.get('/add', function (req, res, next) {
    res.render("admin/category_add")
});

// 渲染后台修改分类页面
router.get('/edit', function (req, res, next) {
    console.log(req.query.id)
    // console.log(req.params.id)
    db.selectCatsById(req.query.id, function (result) {
        console.log(result)
        console.log("=============")
        res.render("admin/category_edit", { data: result[0] })
    });
});// 提交修改信息
router.post("/edit", function (req, res, next) {
    console.log(req.body)
    db.updateCatsById(req.body, function (result) {
        if (result == 1) {
            res.send("更新成功了 <a href='/admin/cats'>返回列表</a>")
        } else {
            res.send("更新失败了 <a href='/admin/cats'>返回列表</a>")
        }
    })
});

// 处理添加分类请求
router.post('/add', function (req, res, next) {
    db.insertCats(req.body, function (result) {
        if (result == 1) {
            res.send('添加分类成功了 <a href="/admin/cats">查看分类列表</a>')
        } else {
            res.send('添加分类失败了 <a href="/admin/cats">查看分类列表</a>')
        }
    });
});
// 处理删除分类请求
router.get("/delete", function (req, res, next) {
    db.deleteCats(req.query.id, function (result) {
        console.log(result)
        res.redirect("/admin/cats")
    })
});




    module.exports = router;
