const business = require('../controllers/business.js');
const { verifyToken } = require('../middleware/auth.js');

module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', business.add);
    router.get('/:id', business.get);
    app.use('/business', verifyToken, router);
}