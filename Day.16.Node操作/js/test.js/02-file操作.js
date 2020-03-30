let file = require("fs");
// file.mkdir("text",(err)=>{
//     if(err) throw err;
//     console.log("创建目录成功")
// });
// // 一次不能创建多级目录
// file.mkdir("app/add",(err)=>{
//     if(err) throw err;
//     console.log("创建目录成功")
// });

/* file.readdir("js",(err,data)=>{
    if(err) throw err;
    console.log("目录为："+data)
    console.log(data)
    // 读取文件夹和文件的名称然后放到数组中
    // [ 'fileName.js', 'index.js', 'request.js', 'test.js' ]
    // 字符串拼接以后就没有数组一说了
}) */

// 同步和异步
// 深层读取文件目录要写全  中间参数用来指定格式 ,异步需要回调
// console.log("任务1执行")
// file.readFile("js/test.js/test.txt","utf-8",(err,data)=>{
//     if(err) throw err;
//     console.log("目录为："+data)
//     console.log("任务2执行")
// })
// console.log("任务3执行")
// console.log("任务4执行")
// 同步不需要回调函数
/* file.readFileSync("js/test.js/test.txt","utf-8",(err,data)=>{if(err) throw err;
    console.log("目录为："+data)
    console.log("任务5执行")
}) */
// console.log(file.readFileSync("js/test.js/test.txt","utf-8"));
// console.log("任务6执行")
/* 
console.log("任务7执行")
file.writeFile("js/test.js/test.txt","测试用例11，会覆盖",(err,data)=>{
    if(err){
        console.log(err,"写入文件失败~")
    }else{
        console.log("写入文件成功了~")
    }
})
console.log("任务9执行") */

// console.log(file.readFileSync("js/test.js/test.txt","utf-8"));
// file.appendFile("js/test.js/test.txt","要追加的内容...",(err,data)=>{
//     if(err){
//         throw err;
//     }else{
//         console.log("追加文件成功");
//     }
// })

// mode: 33206 表示是一个普通的文件   16822 表示是一个目录 */
// 异步靠回调函数   查看文件状态
/* file.stat("./js",(err,data)=>{
    if(err){
        throw err;
    }else{
        console.log(data)
    }
}) */

// unlink异步删除
/* file.unlink("js/test.txt",(err,data)=>{
    if(err) {
    console.log(err)
    }else{
    console.log("删除文件成功了~")
    }
}) */

/* // =============== exists  判断文件是否存在
let r = file.existsSync("./name.txt");
console.log(r);  // false 表示不存在  true表示存在 */

// 绝对路径  __dirname  指定当前目录的上一级目录
// console.log(require("path"));
let path = require("path");
console.log(path.resolve(__dirname, "test.txt"));
console.log(__dirname)