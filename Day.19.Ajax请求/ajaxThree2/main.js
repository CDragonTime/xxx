let express = require("express")
let app = express();
let cityData = require("./cityData.min.json")
let test = require("./js/test")

app.use(express.static('public'));

app.get("/province", (req, res) => {
    // console.log(cityData)
    let provinces = [];
    cityData.forEach((item) => {
        // console.log(item.n);
        provinces.push(item.n);
    })
    res.send(provinces)
})

app.get("/city", (req, res) => {
    // console.log(req.query.province);
    let provinces = [];
    cityData.forEach((item) => {
        if (item.n == req.query.province) {
            item.s.forEach((item1) => {
                provinces.push(item1.n)
            })
        }
    })
    res.send(provinces)
    res.json(provinces)
})

app.get("/country", (req, res) => {
    // console.log(req.query.city);
    let provinces = [];
    cityData.forEach((item) => {
        item.s.forEach((item1) => {
            if (item1.s && item1.n == req.query.city) {
                item1.s.forEach((item2) => {
                    provinces.push(item2.n)
                })
            }
        })
    })
    res.send(provinces)
})


app.get("/test",(req,res)=>{

    res.send(    test.arr);
    // res.json(array);
})



app.listen(2000, function () {
    console.log("2000的端口启动了")
})