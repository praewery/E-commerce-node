const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = headerToken.split(" ")[1]; // Extract token after 'Bearer'
    const decoded = jwt.verify(token, process.env.SECRET);  // Ensure SECRET matches
    req.user = decoded;  // Add decoded info to request

    const user = await prisma.user.findFirst({
      where: { email: req.user.email },
    });

    if (!user || !user.enabled) {
      return res.status(401).json({ message: "This account not found or disabled" });
    }

    next(); // Allow the next middleware or route handler
  } catch (err) {
    console.error("Error in authCheck:", err.message);
    res.status(401).json({ message: "Invalid Token or Signature" });
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
