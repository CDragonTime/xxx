var createError = require('http-errors');
var express = require('express');
var session = require("express-session")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

// ---------------------------- 引入控制器（二级路由）
var indexRouter = require('./controller/home/index');  // 前台首页面的控制器
var posts = require('./controller/home/posts'); // 前台详情页面的控制器
var admin = require('./controller/admin/admin'); // 后台首页面控制
var cats = require('./controller/admin/cats'); // 后台分类管理控制器
var article = require('./controller/admin/posts'); // 后台文章管理控制器
// var usersRouter = require('./controller/users');

var app = express();

// ---------------------------- 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');

// ---------------------------- 设置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// ---------------------------- 配置一些中间件
app.use(session({
  secret: 'wangcai',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/admin')));
app.use(express.static(path.join(__dirname, 'views/home')));

// ---------------------------- 一级路由
// 前台首页面
app.use('/', indexRouter);  // 当访问 /  就交给indexRouter进行处理
// 前台详情页面
app.use("/posts", posts);  // 当访问 /posts 时 就交给post这个控制器

// 后台首页面
app.use("/admin/index",checkLogin);//注释便于测试
app.use("/admin/index",admin); // 当访问admin/index 就交给admin这个控制器
// 后台分类管理
app.use("/admin/cats",checkLogin);
app.use("/admin/cats",cats); 
// 后台文章管理
app.use("/admin/posts",checkLogin);
app.use("/admin/posts",article); 



// app.use('/users', usersRouter);
// 当访问一个没有匹配到的页面时，让它走404页面
app.use("*",(req,res)=>{  // 这个中间件 要放到最下面，如果上面都没有匹配到，会走到下面
  res.render("404")
})



// ---------------------------- 错误处理中间件
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function checkLogin(req,res,next){
  if(!req.session.isLogin){
    res.redirect("/login")
  }else{
    next();
  }
}
module.exports = app;
