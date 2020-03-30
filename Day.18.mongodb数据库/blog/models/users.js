var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;  // 得到ObjectId类型
var url = "mongodb://localhost:27017/";
// 注册用户
function insertUser() {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        var user = { username: "菜鸟教程", password: 123456 };
        dbo.collection("users").insertOne(user, function (err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();
        });
    });
}
// 查询用户
function findUser(user,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("users"). find(user).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result)
            callback(result)
            db.close();
        });
    });
}
// insertUser();
// findUser({username:"菜鸟教程",password:123456})
// findUser({username:"菜鸟教程", password:"123456"},function(){})
exports.insertUser = insertUser;
exports.findUser = findUser;