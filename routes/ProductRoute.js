const express = require('express');
const Products = require('../controllers/ProductController');

const router = express.Router();

router.get('/', Products.getProducts);
router.get('/:id', Products.getProductById);
router.post('/', Products.createProduct);
router.patch('/:id', Products.updateProduct);
router.delete('/:id', Products.deleteProduct);

module.exports = router;
