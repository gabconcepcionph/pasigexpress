const db = require('../models');
const bcrypt = require('bcrypt');

exports.profile = async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.user.email }, attributes: ['email']});
    return res.send(user);
}
exports.register = async (req, res) => {
    let { email, password } = req.body;
    try {
        password = await await bcrypt.hash(password, 10);
        const user = await db.User.create({ email, password });
        const token = user.generateJwtToken();
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user || ! await user.validPassword(password)) {
            return res.status(403).json({ message: 'Invalid Credentials.' });
        }
        const token = user.generateJwtToken();
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}