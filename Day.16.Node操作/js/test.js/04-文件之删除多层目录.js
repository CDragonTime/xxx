let file = require("fs");
let path = require("path");
// 广度优先遍历递归删除文件
function removeFile(dir){
    let files = file.readdirSync(dir);
    files.forEach(fl=>{
        let filename = path.join(dir,fl);
        console.log(filename)
 /*        let stats = file.statSync(filename); // 使用同步的方法获取文件状态  晚上测试使用异步会有什么样问题
        if(stats.isFile()){
            // console.log("是文件~")
            // 删除文件 
            file.unlinkSync(filename); 
            console.log(`删除文件${filename}成功~`)
        }else{
            // 是目录  递归调用removeDir
            removeDir(filename)
        } */
    })
    // fs.rmdirSync(dir); // 删除空目录
    // console.log(`删除目录${dir}成功~`)
}
removeFile("js")