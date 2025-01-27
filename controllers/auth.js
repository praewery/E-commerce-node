const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 1: Validate input
        if (!email) {
            return res.status(400).json({ message: "Please fill email" });
        }
        if (!password) {
            return res.status(400).json({ message: "Please fill password" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Step 2: Check if user already exists
        const user = await prisma.user.findFirst({
            where: { email: email }
        });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Step 3: Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Step 4: Create user
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                role: 'user', // Default role
                enabled: true // Default enabled status
            }
        });

        res.status(201).json({ message: 'Register success' });
    } catch (err) {
        console.error("Error in register:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 1: Check email
        const user = await prisma.user.findFirst({
            where: { email: email }
        });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }

        // Step 2: Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password not match" });
        }

        // Step 3: Create payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        // Step 4: Create tokens
        if (!process.env.SECRET || !process.env.REFRESH_SECRET) {
            console.error("Environment variables SECRET or REFRESH_SECRET are not set");
            return res.status(500).json({ message: "Internal Server Error" });
        }

        const accessToken = jwt.sign(payload, process.env.SECRET, { expiresIn: '15m' });

        // Fix: Define refreshToken here
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        // Save refreshToken to database (optional)
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: refreshToken }
        });

        res.json({ accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.currentUser = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await prisma.user.findFirst({
            where: { email: email },
            select: { id: true, email: true, role: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error("Error in currentUser:", err);
        res.status(500).json({ message: "Server Error" });
    }
};
