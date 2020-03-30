let http = require("http")
let url = require("url")
let fs = require("fs")
let path = require("path")
let qs = require("querystring")
http.createServer((req, res) => {
    let urlObj1 = url.parse(req.url);
    let realUrl = "http://" + req.headers.host + req.url;
    let urlObj = url.parse(realUrl);
    console.log(urlObj1)
    console.log(urlObj)
    switch (urlObj.pathname) {
        case "/":
            fs.readFile("./index.html", "utf-8", (err, data) => {
                if (err) throw err;
                res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
                res.end(data)
            })
            break;
        default:
            let filename = path.join(__dirname, urlObj.pathname)
            console.log(filename)
            if (fs.existsSync(filename)) {
                // console.log(`${urlObj.pathname}这个文件存在~`)
                fs.readFile(filename, (err, data) => {
                    if (err) throw err;
                    res.end(data);
                })
            } else {
                res.end();
            }
            break;
    }
}).listen(300, () => {
    console.log("300的端口启动了")
})