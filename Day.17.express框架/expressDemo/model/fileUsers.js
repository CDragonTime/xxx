let fs = require("fs")
let dataUrl = "./data"
exports.saveUsers = (username,password,callback)=>{
    console.log(dataUrl+"/"+username+".txt")
    fs.writeFile(dataUrl+"/"+username+".txt",password,callback)
}
/**
 * 获取所有的订单信息（就是获取手机号） let a=b=122;
 * function(arr){
        // 把模板和数据进行绑定 把数据融合到模板中
        res.render("allOrder",{
            "all":arr
        });
 */

exports.getAllFilesName = (callback)=>{
    fs.readdir(dataUrl,function(err,filenameArray){
        if(err){
            // throw err; 
            throw new Error("读取订单清单错误~")
        }
        // console.log(filenameArray) // [ '000.txt', '666.txt', '888.txt' ]
        let resultArr = []; // 保存不带txt的手机号
        for(let i=0; i<filenameArray.length; i++){
            // console.log(filenameArray[i])
            // console.log(filenameArray[i].substr(0,filenameArray[i].length-4));
            resultArr.push(filenameArray[i].substr(0,filenameArray[i].length-4))
        }
        // console.log(resultArr); // [ '000', '666', '888' ]
        callback(resultArr)
    })
}