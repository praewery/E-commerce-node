const e = require("express")

exports.listUsers = async(req, res) => {
    try{
        res.send("List Users")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
exports.changeStatus = async(req, res) => {
    try{
        res.send("chage status")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
exports.changeRole = async(req, res) => {
    try{
        res.send("change role")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
exports.getUserCart = async(req, res) => {
    try{
        res.send("usercart")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
exports.emptyCart = async(req, res) => {
    try{
        res.send("emptyCart")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
exports.saveAddress = async(req, res) => {
    try{
        res.send("saveAddress")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
exports.getOrder = async(req, res) => {
    try{
        res.send("saveAddress")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}