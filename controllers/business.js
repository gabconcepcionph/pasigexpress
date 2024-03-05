const db = require('../models');

exports.get = async (req, res) => {
    const {id} = req.params;
    const business = await db.Business.findByPk(id, {attributes: ['name', 'phone', 'description', 'user_id']});
    if(!business) return res.status(404).send('Business not found');

    return res.send(business);
}
exports.add = async (req, res) => {
    const {name, location_id, phone, description} = req.body;
    const {id: user_id} = req.user;

    const location = await db.Location.findByPk(location_id);
    if(!location) return res.status(404).send('Location not found');

    const business = await db.Business.findOne({where: {name, user_id}});
    if(business) return res.status(409).send('Business already exists');

    await db.Business.create({name, location_id, phone, description, user_id});
    return res.send('Business added successfully');
}