/* let http = require("http")
http.createServer((req,res)=>{
    let data = "";
    // 直接读取的URL并不能读取到后面拼接的字符串
    switch(req.url){
        case "/":
            data = "<h1>首页面</h1>"
            break;
        default:
            data = "404访问的页面不存在"
            break;
    }
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
    res.end(data)
}).listen(300,()=>{
    console.log("300的端口启动了")
}) */


/* let http = require("http")
// 不是得到url而是解析url
let url = require("url")
// qs用来解析字符串
let qs = require("querystring")
http.createServer((req, res) => {
    // 得到url信息的对象
    let urlObj = url.parse(req.url)
    let data = "";
    switch (req.url) {
        case "/":
            data = "<h1>首页面</h1>";
            break;
        default:
            data = "404访问的页面不存在" + urlObj.query+"未使用queryString解析";
            console.log("======使用了queryString解析：");
            console.log(qs.parse(urlObj.query));
            break;
    }
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
    res.end(data)
}).listen(300, () => {
    console.log("300的端口启动了")
}) */


/* 
Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?username=%22%E5%BC%A0%E4%B8%89%22',
    query: 'username=%22%E5%BC%A0%E4%B8%89%22',
    pathname: '/',
    path: '/?username=%22%E5%BC%A0%E4%B8%89%22',
    href: '/?username=%22%E5%BC%A0%E4%B8%89%22'
  } */
let http = require("http")
// 不是得到url而是解析url
let url = require("url")
// qs用来解析字符串
let qs = require("querystring")
http.createServer((req, res) => {
    // 得到url信息的对象
    let urlObj = url.parse(req.url);
    console.log(urlObj)
    let queryObj = qs.parse(urlObj.query);
    console.log(queryObj)
    let data = "";
    // 得到的是不含字符串的路径：urlObj.pathname
    /* +qs.parse(urlObj) */
    switch (urlObj.pathname) {
        case "/":
            data = "<h1>首页面</h1>"+queryObj.username;
            break;
        default:
            data = "404访问的页面不存在";
            break;
    }
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
    res.end(data)
}).listen(300, () => {
    console.log("300的端口启动了")
})