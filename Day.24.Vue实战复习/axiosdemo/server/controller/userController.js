let express = require("express")
const app = express()

app.get("/test",(req,res)=>{
    res.send("接口调用是否成功")
})


app.listen(2000,()=>{
    console.log("2000的端口启动了")
})