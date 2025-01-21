const express = require('express')
const router = express.Router()
// import controller
const { create, list,read,update, remove, listby, searchfilter } = require('../controllers/product')

//@Endpoint : /product
router.post('/product', create)
router.get('/products/:count', list)
router.get('/product/:id', read)
router.put('/product/:id', update)
router.delete('/product/:id', remove)
router.post('/productby', listby)//ใช้sort สินค้า
router.post('/search/filter',searchfilter)//ค้นหาสินค้า

module.exports = router