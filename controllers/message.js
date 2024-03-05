const db = require('../models');

exports.get = async (req, res) => {
    const {id: user_id} = req.user;
    
    const messages = await db.Message.findAll({where: {from: user_id}, attributes: ['message', 'user_id', 'createdAt']});
    return res.send(messages);
}
exports.add = async (req, res) => {
    const {message, to} = req.body;
    const {id: user_id} = req.user;

    const user = await db.User.findByPk(to);
    if(!user) return res.status(404).send('User not found');

    await db.Message.create({message, user_id:to, from: user_id});
    return res.send('Message sent successfully');
}