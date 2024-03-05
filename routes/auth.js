const auth = require('../controllers/auth.js');
const { verifyToken } = require('../middleware/auth.js');

module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    router.post('/register', auth.register);
    router.post('/login', auth.login);
    router.get('/profile', verifyToken, auth.profile);
    app.use('/', router);
}