var express = require('express');
var router = express.Router();
var users = require("../../models/users")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index');
});

router.get('/login', function(req, res, next) {
  res.render('admin/login');
});//检查登录信息
router.post('/login', function(req, res, next) {
  console.log(req.body)
  // console.log("========")
  users.findUser(req.body,function(result){
    console.log(result)
    console.log("===============")
    if(result.length){
      req.session.isLogin = true;
      res.redirect("/admin/index");
    }else{
      res.redirect('/login');
    }
  })
});

router.get('/logout', function(req, res, next) {
  req.session.isLogin = null;
  res.redirect("/admin/index");
});//检查登录信息
module.exports = router;
