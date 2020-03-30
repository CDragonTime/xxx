let express = require("express")
let app = express();
let calController = require("./controller/calculateController")

// 加载静态文件
app.use(express.static("public"))
// 配置模板引擎
app.set("view engine","ejs");


app.get("/",calController.showMain)
app.get("/:number",calController.showCalcu)

app.listen(3000,()=>{
    console.log("服务器在3000端口启动了")
})