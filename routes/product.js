const product = require('../controllers/product.js');
const { verifyToken } = require('../middleware/auth.js');

module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', product.add);
    router.get('/:id', product.get);
    app.use('/product', verifyToken, router);
}