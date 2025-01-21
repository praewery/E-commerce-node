const jwt = require('jsonwebtoken')
const  prisma = require('../config/prisma')

exports.authCheck = async(req, res, next) => {
    try{
        const headerToken = req.headers.authorization
        console.log(headerToken)
        if(!headerToken){
            return res.status(401).json({ message: "Unauthorized" })

        }   
        const token = headerToken.split(' ')[1] //ไม่เอาBearer

        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode //เอาข้อมูลมาใช้งานต่อใส่ในkey user

        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            }
        })
        //ถ้าไม่มีuser
        if(!user.enabled){
            return res.status(401).json({ message: "This account not found" })
        }

        console.log(decode)
        next()//ให้ไปทำงานต่อ
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

exports.adminCheck = async(req, res, next) => {
    try{
        const { email } = req.user
        console.log('admin check',email)
        const adminUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        console.log('admin check',adminUser)
        next()

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Error Admin access denied" })
    }
}