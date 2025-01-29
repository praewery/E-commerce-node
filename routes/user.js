const express = require('express');
const router = express.Router();
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const {listUsers,changeStatus, changeRole, userCart,getUserCart,emptyCart,saveAddress,getOrder,saveOrder} = require('../controllers/user')
//admin
router.get('/users',authCheck,adminCheck,listUsers)
router.post('/change-status',authCheck,adminCheck,changeStatus)
router.post('/change-role',authCheck,adminCheck,changeRole)

//user
router.post('/user/cart',authCheck,userCart)
router.get('/user/cart',authCheck,getUserCart)
router.delete('/user/cart',authCheck,emptyCart )

router.post('/user/address',authCheck, saveAddress)

router.post('/user/order',authCheck, saveOrder)
router.get('/user/order', authCheck,getOrder)


module.exports = router;