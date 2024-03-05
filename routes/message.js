const message = require('../controllers/message.js');
const { verifyToken } = require('../middleware/auth.js');

module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', message.add);
    router.get('/', message.get);
    app.use('/messages', verifyToken, router);
}