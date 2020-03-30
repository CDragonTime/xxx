let express = require("express")
let bodyParser = require("body-parser")
let app = express();
let allStuCon = require("./controller/allStuCon")
// 设置末班引擎
app.set("view engine","ejs");
// 配置静态文件
app.use(express.static("public"))

// body-parser中间件配置文件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/allStudent",allStuCon.allStudent);
app.get("/addHtml",(req, res) => {
    res.render("addStudent");
})
app.post("/addStudent",allStuCon.addStudent);


// 此接口返回json数据
app.get("/allStuJson",allStuCon.allStuJson);

app.listen(10086,function(){
    console.log("10086端口启动了")
})