let fs = require("fs")
let express = require("express")
// let app =  express()
let city = require("../cityData.min.json")
// let test = require("../test.json")

// console.log(city)
let arr = []
city.forEach(item => {
    // console.log(item.n);
    let arr1 = []
    item.s.forEach(item1 => {
        // console.log(item1.n)
        if (item1.s) {
            let arr2 = []
            item1.s.forEach(item2 => {
                arr2.push({value: item2.n,label: item2.n})
                // console.log(item2.n)
            })
            arr1.push({value: item1.n,label: item1.n,children:arr2})
        }else{
        arr1.push({value: item1.n,label: item1.n})
        }
    })
    arr.push({value: item.n,label: item.n,children:arr1})
})
console.log(arr.toString)
console.log(arr)
// console.log(JSON.parse(arr))
// app.get("/",(req,res)=>{
//     res.send(arr)
// })

// app.listen("1000",function(){
//     console.log("1000的端口启动了")
// })
exports.arr = arr;