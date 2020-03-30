// 向外暴露一个函数
let fileUsers = require("../model/fileUsers")
exports.showUser = (req,res)=>{
    // 默认找views下面的xxx.ejs文件
    res.render("xxx.ejs")
}

exports.saveUser = (req,res)=>{
    fileUsers.saveUsers(req.body.username,req.body.password,function(err){
        if(err) {
            res.send("-1")
        }else{
        res.send("1")
        }
    });
}

exports.allOrder = (req,res)=>{
    fileUsers.getAllFilesName(function(arr){
        // 把模板和数据进行绑定 把数据融合到模板中
        res.render("allOrder",{
            "all":arr
        });
    })
}