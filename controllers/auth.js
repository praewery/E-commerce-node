const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req, res) => {
    //code
    try{
        const { email, password } = req.body
        //step validation
        if(!email) {
            return res.status(400).json({ message: "Please fill email" })
        }
        if(!password){
            return res.status(400).json({ message: "Please fill password" })
        }

        //step2 db already?
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(user){
            return res.status(400).json({ message: "Email aready Exits" })
        }

        //step3 hash password
        const hashPassword = await bcrypt.hash(password,10) //เกลือคือเลขที่ปนตอนใส่รหัสเลขแต่รหัสเลขจะไม่เหมือนกัน
        

        //step4 register
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })

        

        res.send('register success')

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

exports.login = async(req, res) => {
    try{
        const { email, password } = req.body
        //step1 check email
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(!user){
            return res.status(400).json({ message: "Email not found" })
        }
        //step2 check password  userเอาจากตัวที่เช็คด้านบน
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){ 
            return res.status(400).json({ message: "Password not match" })
          }
        //step3 create payload เอาไว้เข้ารหัสtoken
        const payload = {
            id : user.id,
            email: user.email,
            role: user.role
        }
        
        //step4 create token
        jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: '1d' },(err,token)=>{
            if(err) {
                return res.status(500).json({ message: "Server Error" })

            }
            res.json({ token })
        }) 
        console.log(payload)

        res.send('hello login controller')

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }

}

exports.currentUser = async(req, res) => {
    try{
        res.send('hello  currentUser controller')

    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
