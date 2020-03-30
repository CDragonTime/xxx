var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
exports.getStudents = function (callback) {

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("student");
        dbo.collection("stuMessage").find({}).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            callback(result);
            db.close();
        });
    });
}
exports.addStu = function (student,callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("student");
        // var myobj = { name: "菜鸟教程", url: "www.runoob" };
        dbo.collection("stuMessage").insertOne(student, function (err, res) {
            if (err) {
                callback("-1")
            }
            callback("1")
            db.close();
        });
    });
}

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("student");
//     // var myobj = { name: "菜鸟教程", url: "www.runoob" };
//     // var student = { name: "菜鸟教程", age: 28, sex :"不晓得", provide :"测试地址" };
//     var student = {  age: 28, sex :"不晓得", provice :"测试地址" };
//     dbo.collection("stuMessage").insertOne(student, function (err, res) {
//         if (err) throw err;
//         // console.log(res)
//         console.log(res.result)
//         console.log(res.result.ok)
//         console.log(res.result.n)
//         // callback(res.result)
//         db.close();
//     });
// });