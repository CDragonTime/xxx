let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");
let server = http.createServer((req,res)=>{
    let realUrl = "http://"+req.headers.host+req.url;
    let urlObj = url.parse(realUrl);
    switch(urlObj.pathname){
        case "/":
            fs.readFile("index.html","utf8",(err,data)=>{
                if(err) throw err;
                res.end(data)
            })
            break;
        case "/dopublish":
            // 得到客户端提交过来的数据   data  end

            // 想一下，数据应该保存什么地方   liuyan.txt   wirteFile

            // 如果把数据渲染到页面中  ejs 模板引擎   
            break;
        default:
            let filename = path.join(__dirname, urlObj.pathname)
            if(fs.existsSync(filename)){
                fs.readFile(filename,(err,data)=>{
                    if(err) throw err;
                    res.end(data);
                })
            }else{
                res.end();
            }
            break;
    }
});
server.listen(3000,()=>{
    console.log("服务器在3000端口启动了~")
})