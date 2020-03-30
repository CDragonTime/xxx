let http = require("http")
let url = require("url")
let fs = require("fs")
let path = require("path")
let qs = require("querystring")
http.createServer((req, res) => {
    let urlObj1 = url.parse(req.url);
    let realUrl = "http://" + req.headers.host + req.url;
    let urlObj = url.parse(realUrl);
    console.log(urlObj.pathname);
    switch (urlObj.pathname) {
        case "/login":
            fs.readFile("./login.html", "utf-8", (err, data) => {
                if (err) throw err;
                res.writeHead(200, { "content-type": "text/html;charset=utf-8"});
                res.end(data);
            })
            break;
        case "/doLogin":
            let result = "";
            // 需要接收用户提交给后端的用户名和密码
            req.on("data",(chunk)=>{
                result += chunk;
            });
            req.on("end",()=>{
                let resObj = qs.parse(result);
                res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
                res.end("用户名为："+resObj.username+"密码为："+resObj.password);
            })
            break;
        default:
            res.end();
            break;
    };
}).listen(300, () => {
    console.log("300的端口启动了");
});