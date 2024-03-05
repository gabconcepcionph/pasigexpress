const db = require('../models');

exports.get = async (req, res) => {
    const {id} = req.params;
    
    const product = await db.Product.findByPk(id, {attributes: ['name', 'moq', 'business_id']});
    if(!product) return res.status(404).send('Product not found');
    return res.send(product);
}
exports.add = async (req, res) => {
    const {business_id, name, moq} = req.body;

    const business = await db.Business.findByPk(business_id);
    
    if(!business) return res.status(404).send('Business not found');
    if(business.user_id !== req.user.id) return res.status(403).send('Unauthorized');

    const product = await db.Product.findOne({where: {name, business_id}});
    if(product) return res.status(409).send('Product already exists');

    await db.Product.create({business_id, name, moq});
    return res.send('Product added successfully');
}