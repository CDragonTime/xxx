/*
    main.js文件不适合放太多，一般来说就放一级路由
 */
let express = require("express");
let ejs = require("ejs");
let user = require("./controllers/user")
var bodyParser = require('body-parser')
let app = express();

// 配置body-parser  去npm官网
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 一级路由
app.get("/",user.showUser)
app.post("/save",user.saveUser)

// 直接用app.开接口
app.get("/allOrder",user.allOrder)
// app.get("/order/:shoujihao", user.oneOrder)

app.set("view engine","ejs");
// 在express中有一个内置的中间件,可以托管静态资源
app.use(express.static("public"));


app.listen(3001,()=>{
    console.log("服务器在3001端口启动了")
})