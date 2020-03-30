第一步：找到项目所在位置，运行cmd命令
    npm init -y
    初始化项目
    npm i express
    导入express依赖
第二步：创建入口文件main.js(一般叫main.js / qpp.js / index.js)
    入口文件的内容不要太多，尽量封装到别的模块内
    比如路由之类的
    // 在express中有一个内置的中间件,可以托管静态资源
    app.use(express.static("public"));
第三步：使用ejs模板引擎
    let ejs = require("ejs");
    app.get("/",(req,res)=>{
        // 默认找views下面的xxx.ejs文件
        res.render("xxx.ejs")
    })
    app.set("view engine","ejs");
    服务端渲染的返回views的xxx.ejs文件
第四步：把页面逻辑完成，托管jQuery文件到public
    记得路径前不需要指定public，express内置中间件已经指定过了
    用ajax发出post请求，携带数据，通过
    var bodyParser = require('body-parser')
    // 配置body-parser  去npm官网
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    通过bodyParser配置请求
    通过req.body直接得到请求的参数对象
第五步：配置路由到另一个文件
    方便解耦，更有利于mvc模式开发
    在user.js的路由中配置操作文件的文件夹model并传入一个引入的
    函数，是在model层读取文件时回调的
    