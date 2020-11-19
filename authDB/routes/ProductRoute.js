const express = require('express')
const Product = require('../controller/ProductController')
const router = express.Router()

router.post('/addProduct', Product.StoreProduct)
router.get('/products', Product.GetAllProducts)
router.get('/getProductById/:id', Product.GetProductById)
router.delete('/deleteProductById/:id', Product.DeleteProductInfo)
router.put('/updateProduct', Product.UpdateProductInfo)



module.exports = router