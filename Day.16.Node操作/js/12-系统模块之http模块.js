/* 
    HTTP：客户端与服务器交流工具  
        HTTP请求：  请求分get和post
            请求行：请求地址+请求的方法
            请求头：请求时带了一些信息以xx:xx格式显示  （客户端与服务器之间约束的一些规则~）
            请求正文：给服务器传递的数据   get请求没有请求正文


        HTTP响应： 不分分get和post
            响应行（状态行）： 
                1) 协议版本，通常是HTTP/1.1
                2) 响应的状态码 和 响应的描述(和状态码是对应) 
            响应头：
                告诉浏览器一些信息，如你应该以什么样的编码解析我给你的内容
            响应正文：把数据返回给浏览器

        常用的状态码：
            200 OK 表示数据回来了  一切正常
            304 Not Modified 使用缓存  
            404 Not Found 找不到
            403 For  没有权限
            500 服务器内部出错了
            ....  

            1XX 
            2XX
            3XX
            4XX
            5XX

    HTTP请求之GET请求：
        1）浏览器地址栏只能发出GET请求。
        2）基于SRC，HREF也能发出请求，也是GET请求
        3）AJax也可以发出get请求
        4）表单可以发出GET请求  如果不写method="GET"  默认就是get请求
            <form action="http://www.baidu.com" method="GET">
                <input type="text">
                <input type="submit">
            </form>

    HTTP请求之POST请求：
        1）表单可以发出POST请求  如果不写method="POST"  
            <form action="http://www.baidu.com" method="POST">
                <input type="text">
                <input type="submit">
            </form>
        2）AJax也可以发出post请求
        3）postman 工具 也可以发出post请求 

    http模块 创建Server 里面的核心方法：
        listen()   监听端口

        server对象有两个事件：
            request事件   当浏览器发起Http请求时触发request事件
            listening事件   当调用listen方法触发了

            绑定事件：
                btn.onclick = function(ev){}  
                btn.addEventListener("click",(ev)=>{})
                btn.bind("click",(ev)=>{})
                btn.on("click",(ev)=>{})

    安装nodemon:
        监听文件变化，如果文件化了，它会自己帮你重启服务器。
        npm i nodemon -g  全局安装（所有的项目都可以使用）

        使用：nodemon .\12-系统模块之http模块.js
 */

/* // ========================== 下面的写法，是为了让大家更好理解~
let http = require("http");
// 创建服务
let server = http.createServer();
// console.log(server); // Server

server.on("request",(req,res)=>{
    // req里面包含了请求相关的信息   res里面包含了响应相关的信息 
    res.writeHead(200, {"content-type":"text/html;charset=utf-8"});
    res.write("<h1>hello 浏览器~</h1>"); // 改了服务器代码一定要重启服务器
    res.end(); // 告诉浏览器 响应的内容OK了
})
server.listen(3000); // 服务在监听3000端口 */

// ========================== 简洁的写法~
let http = require("http");
let server = http.createServer((req,res)=>{
    res.writeHead(200, {"content-type":"text/html;charset=utf-8"});
    res.write("<h1>hello 浏览器 666  888 ~</h1>"); 
    res.end(); 
});
server.listen(3000); 





























