const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

exports.authCheck = async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization;
        console.log("Authorization header:", headerToken);

        if (!headerToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = req.headers.authorization?.split(' ')[1]; // ไม่เอา Bearer
        
        console.log("Token extracted:", token);

        const decode = jwt.verify(token, process.env.SECRET);
        console.log("Decoded token:", decode);

        // ตรวจสอบว่า token หมดอายุหรือไม่
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in UNIX timestamp (seconds)
        if (currentTime > decode.exp) {
            return res.status(401).json({ message: "Token has expired" });
        }

        req.user = decode; // ใส่ข้อมูลที่ decode ลงใน req.user

        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email,
            },
        });

        if (!user || !user.enabled) {
            return res.status(401).json({ message: "This account not found or disabled" });
        }

        next(); // ให้ middleware อื่นทำงานต่อ
    } catch (err) {
        console.error("Error in authCheck:", err.message);
        res.status(500).json({ message: "Token Invalid" });
    }
};



exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user;

        // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่
        const adminUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!adminUser || adminUser.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Admin only" });
        }

        next(); // ให้ middleware อื่นทำงานต่อ
    } catch (err) {
        console.error("Error in adminCheck:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
