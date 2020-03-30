let express = require("express")
let app = express();



app.get("/",(req,res)=>{
    res.render("login.ejs");
})
app.post("/register",(req,res)=>{
    res.send("测试注册接口");
})

app.listen(3000,function(){
    console.log("3000的端口启动了")
})