let http = require("http");
let server = http.createServer();
server.on("request", (req, res) => {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    // console.log(req.httpVersion);
    // console.log(req.headers);
    console.log(req.url);   //默认的url并不是一个完整的url

    //exports 表示模块的导出对象
    // require 表示require方法
    // module 表示当前模块对象
    // __filename 表示当前文件的绝对路径
    // __dirname 表示当前文件夹的绝对路径
    res.write((require("fs").readFileSync(__dirname + "/test.json", "utf-8")));
    res.end();
})
server.listen(300,()=>{
    console.log("服务器在300的端口启动了")
});
