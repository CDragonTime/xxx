let http = require("http");
let server = http.createServer((req,res)=>{
    res.setHeader('Content-type','text/plain');
    res.write("hello Server");
    res.end();
})

// 监听3000端口
server.listen(300,()=>{
    console.log("服务器在300端口启动了....")
})