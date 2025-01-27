const e = require("express")
const prisma = require('../config/prisma')

exports.listUsers = async(req, res) => {
    try{
        const users = await prisma.user.findMany({
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
        const { cart } = req.body; // Cart items from request body
        const userId = req.user.id; // Logged-in user's ID

        // Find user
        const user = await prisma.user.findFirst({
            where: { id: Number(userId) },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete old cart items and cart
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

        // Prepare products for the cart
        const products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price,
        }));

        // Calculate total price
        const cartTotal = products.reduce(
            (sum, item) => sum + item.price * item.count,
            0
        );

        // Create new cart with products
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