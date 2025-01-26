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
router.get('/user/getcart',authCheck,getUserCart)
router.delete('/user/emptycart',authCheck,emptyCart )

router.post('/user/address', saveAddress)

router.post('/user/order', saveOrder)
router.get('/user/order', getOrder)


module.exports = router;