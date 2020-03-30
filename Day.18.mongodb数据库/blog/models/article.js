var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;  // 得到ObjectId类型
var url = "mongodb://localhost:27017/wc_blog";

// 存储一个文章信息
function insertArticle(data,callback){
    // console.log(data)
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("article").insertOne(data, function(err, res) {
            if (err){
                console.log("插入数据失败了~");
                // callback(err); // 把错误信息返回给上层  
                callback("-1"); // -1代表插入失败了
            };
            // callback('添加数据成功了 <a href="/admin/cats">查看分类列表</a>'); // 1代表插入数据成功了
            callback("1"); // 1代表插入数据成功了
            console.log("文档插入成功");
            db.close();
        });
    });
}
// 获取所有文章
function selectAllArticle(callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("article"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            callback(result)
            db.close();
        });
    });
}
// selectAllArticle(function(result){console.log(result)})
// insertArticle({acat:"分类标题1",atitle:"测试文章",amain:"文章摘要",acontent:"文站得高",date:new Date()},function(result){console.log(result)})
exports.insertArticle = insertArticle;
exports.selectAllArticle = selectAllArticle;