var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("admin/admin"); // 渲染后台的首页面
});

module.exports = router;
