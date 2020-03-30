var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;  // 得到ObjectId类型
var url = "mongodb://localhost:27017/wc_blog";
// 存储一个分类信息
function insertCats(data,callback){
    // console.log(data)
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("cats").insertOne(data, function(err, res) {
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
// 获取所有分类
function selectAllCats(callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("cats"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            callback(result)
            db.close();
        });
    });
}
// 根据id查询分类
function selectCatsById(id,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        dbo.collection("cats"). find({"_id":ObjectId(id)}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            callback(result)
            db.close();
        });
    });
}
// 根据id更新分类
function updateCatsById(cat,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        var whereStr = {_id:ObjectId(cat.id)};  // 查询条件
        var updateStr = {$set: { "ctitle" : cat.ctitle, "csort":cat.csort }};
        dbo.collection("cats").updateOne(whereStr, updateStr, function(err, res) {
            if (err) callback(0);
            callback(1)
            console.log("文档更新成功");
            db.close();
        });
    });
}
// 根据id删除分类
function deleteCats(id,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wc_blog");
        var whereStr = {_id:ObjectId(id)};  // 查询条件
        dbo.collection("cats").deleteOne(whereStr, function(err, obj) {
            if (err) callback(0);
            callback(1);
            db.close();
        });
    });
}

//测试数据
// selectAllCats(function(){})
// selectCatsById("5e7c106246df8b4abce875df",function(result){console.log(result)})
// deleteCats("5e7daa5a9c5ca46470d70e45",function(result){console.log(result)})

//暴露方法
exports.updateCatsById = updateCatsById;
exports.selectCatsById = selectCatsById;
exports.insertCats = insertCats;
exports.selectAllCats = selectAllCats;
exports.deleteCats = deleteCats;


