const express = require('express')
const router = new express.Router();
const productController = require('../controller/productsController')

router.route('/products').post(productController.createProduct).get(productController.renderProducts)

module.exports = router