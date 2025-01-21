const express = require('express')
const router = express.Router()
// import controller
const { create, list,update, remove, productby, searchfilter, listby } = require('../controllers/product')

//@Endpoint : /product
router.post('/product', create)
router.get('/products/:count', list)
router.put('/products/:id', update)
router.delete('/product/:id', remove)
router.post('/productby', listby)//ใช้sort สินค้า
router.post('/search/filter',searchfilter)//ค้นหาสินค้า

module.exports = router