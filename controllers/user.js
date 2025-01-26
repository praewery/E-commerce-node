const e = require("express")
const prisma = require('../config/prisma')

exports.listUsers = async(req, res) => {
    try{
        const users = await prisma.user.fineMany({
            select: {
                id: true,
                email: true,
                role:true,
                enabled:true,
                address:true

            }
        })
        res.json("List Users")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
exports.changeStatus = async(req, res) => {
    try{
        const { id, enabled} =req.body
        console.log(id, enabled)
        res.send("change status")

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
        res.send("getusercart")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

// clear cart
exports.emptyCart = async(req, res) => {
    try{
        res.send("emptyCart")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
exports.userCart = async(req, res) => {
    try{
        res.send("userCart")

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
exports.saveOrder = async(req, res) => {
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