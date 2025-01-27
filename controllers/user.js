const e = require("express")
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma')

exports.listUsers = async (req, res) => {
    try {
        // ตรวจสอบว่า Authorization header มีหรือไม่
        const headerToken = req.headers.authorization;
        if (!headerToken) {
            return res.status(401).json({ message: "Unauthorized. No token provided." });
        }

        // แยก token จาก 'Bearer <token>'
        const token = headerToken.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Token missing." });
        }

        // ตรวจสอบและ decode token
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized. Token is invalid or expired." });
            }

            // ถ้า token valid, ดึงข้อมูลผู้ใช้จากฐานข้อมูล
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    role: true,
                    enabled: true,
                    address: true,
                },
            });

            // ส่งข้อมูลผู้ใช้กลับ
            res.json(users);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.changeStatus = async(req, res) => {
    try{
        const { id, enabled} =req.body

        const user = await prisma.user.update({
            where : { id:Number(id)},
            data : {enable: enabled }
            }

        )

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}
exports.changeRole = async(req, res) => {
    try{
        const { id, role} =req.body
        console.log(id, role)
        res.send("change status")
        const user = await prisma.user.update({
            where : { id:Number(id) },
            data : {enable: role }
            }

        )
        res.send("change role success")

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

exports.userCart = async (req, res) => {
    try {
        const { cart } = req.body; // รับข้อมูลสินค้าในตะกร้า
        const userId = req.user.id; // ดึง ID ของผู้ใช้จาก req.user ที่มากับ token

        // ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลหรือไม่
        const user = await prisma.user.findFirst({
            where: { id: Number(userId) },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ลบข้อมูลสินค้าก่อนหน้าในตะกร้า
        await prisma.productOnCart.deleteMany({
            where: {
                cart: {
                    orderedById: user.id,
                },
            },
        });

        await prisma.cart.deleteMany({
            where: {
                orderedById: user.id,
            },
        });

        // เตรียมข้อมูลสินค้าใหม่ที่ต้องการใส่ในตะกร้า
        const products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price,
        }));

        // คำนวณราคารวม
        const cartTotal = products.reduce(
            (sum, item) => sum + item.price * item.count,
            0
        );

        // สร้างตะกร้าสินค้าใหม่
        const newCart = await prisma.cart.create({
            data: {
                cartTotal: cartTotal,
                orderedById: user.id,
                product: {
                    createMany: {
                        data: products,
                    },
                },
            },
        });

        res.json({ message: "Cart updated successfully", cart: newCart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};




exports.getUserCart = async(req, res) => {
    try{
        const cart = await prisma.cart.findFirst({
            where:{
                
            }
        })
        

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