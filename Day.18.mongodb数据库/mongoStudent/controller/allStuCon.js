let studentData = require("../model/studentData")

exports.allStudent = (req, res) => {
    // res.render("index", { "stuArr": studentData.stuArray })
    studentData.getStudents(function (stuArr) {
        // console.log(stuArr)
        res.render("index", { "stuArr": stuArr })
    })
}

exports.addStudent = (req,res)=>{
    console.log(req.body);
    studentData.addStu(req.body,function(result){
        res.send(result)
    })
    // studentData.addstu();
}


exports.allStuJson = (req,res)=>{
    studentData.getStudents(function (stuArr) {
        // console.log(stuArr)
        // res.render("index", { "stuArr": stuArr })
        res.json({"results":stuArr})
    })
}