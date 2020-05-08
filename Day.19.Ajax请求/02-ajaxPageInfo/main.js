let express = require("express")
let app = express();
let path = require("path")
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(express.static(path.join(__dirname + "/public")))

app.get("/getNews", (req, res) => {
    let pageNum = req.query.pageNum;
    if(pageNum <= 0){
        pageNum = 1;
    }
    let pageSize = 5;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pageInfo");
        dbo.collection("news").find().skip((pageNum-1)*pageSize).limit(pageSize).toArray(function(err, result) {
            if (err) throw err;
            dbo.collection("news").find().count().then((value)=>{
                // 获得总数据
                let total = value;
                let size = Math.ceil(total/pageSize);
                res.json({
                    data:result, //查询的结果
                    pageNum,    //传来的页数
                    pageSize,   //传来的数据
                    total,      //总条数
                    size,       //总页数
                })
            }).catch((reason)=>{
                console.log(reason)
            })
            db.close();
      });
    });
})




/* app.get("/insert", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("pageInfo");
        // let json = new JSON();
        // json.title = '这是新闻标题1';
        // json.date = new Date();
        // json.describe = "这是新闻1的描述";
        var myobj = [];
        for (let i = 0; i < 30; i++) {
            let json = {};
            json.title = '这是新闻标题'+i;
            json.date = new Date();
            json.describe = "这是新闻"+i+"的描述";
            myobj.push(json)
        }
        dbo.collection("news").insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("插入的文档数量为: " + res.insertedCount);
            db.close();
        });
    });
}) */
app.listen(4000, function () {
    console.log("4000的端口启动了")
})
