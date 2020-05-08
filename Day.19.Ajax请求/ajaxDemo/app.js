let express = require("express")
let app = express();
let bodyParser = require("body-parser")
let path = require("path")

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.render("login.ejs");
})

let arr = ["admin",123,123456]
app.post("/register",(req,res)=>{
    console.log(req.body)
    res.send("测试注册接口");
})
app.get("/check",(req,res)=>{
    let username = req.query.username;
    if(arr.find(user=>user==username)){
        res.send("用户名不可用")
    }else{
        res.send("<i style='color: green'>用户名可用</i>")
    }
})

app.listen(3000,function(){
    console.log("3000的端口启动了")
})