//import 
const express = require('express');
const router = express.Router();

//import controller
const { register,login,currentUser} = require('../controllers/auth');


router.post('/register', register)
router.post('/login', login)
router.post('/current-user', currentUser)//check log-in ยัง
router.post('/current-admin', currentUser)//check admin ยัง



module.exports = router;