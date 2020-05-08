let express = require("express")
let path = require("path")
let app = express();
let fs = require("fs")

app.use(express.static(path.join(__dirname + '/public')))

app.get("/indexEjs", (req, res) => {
    res.render("index.ejs")
});

// 获取省
app.get("/province", (req, res) => {
    fs.readFile("cityData.min.json", "utf-8", (err, result) => {
        if (err) throw err;
        let jsonObj = JSON.parse(result);
        // 定义一个数组存放数据
        var province = [];
        // 抽离json对象中第一层的数据,遍历获取第一层的n
        jsonObj.forEach(function (item) {
            province.push(item.n);
        });
        /*  返回JSON格式推荐使用res.json
            当传递对象或数组时，这两个方法是相同的，
            但是res.json()也会转换非对象，如null和undefined，这些无效的JSON。 */
        // res.send(province);
        res.json(province);
    })
})

// 获取市
app.get("/city", (req, res) => {
    let province = req.query.province;
    fs.readFile("cityData.min.json", "utf-8", (err, result) => {
        if (err) throw err;
        let jsonObj = JSON.parse(result);
        var city = [];
        // 抽离json对象中第一层的数据n做比较
        jsonObj.forEach(function (item) {
            if (item.n == province) {
                // 抽离json对象中第二层的数据n当做数组返回
                item.s.forEach(function (item1) {
                    city.push(item1.n);
                });
            }
        });
        res.json(city);
    })
})

// 获取县
app.get("/xian", (req, res) => {
    let city = req.query.city;
    fs.readFile("cityData.min.json", "utf-8", (err, result) => {
        if (err) throw err;
        let jsonObj = JSON.parse(result);
        var xian = [];
        jsonObj.forEach(function (item) {
            item.s.forEach(function (item1) {
                if (item1.n == city && item1.s != null) {
                    item1.s.forEach(function (item2) {
                        xian.push(item2.n);
                    })
                }
            })
        });
        res.json(xian);
    })
})

app.listen(2000, function () {
    console.log("2000的端口启动了")
})