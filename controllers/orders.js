const Order = require('../models/orders');

exports.create = async (req, res, next) => {
    try {
        if(!req.body.products.length) {
            return res.status(400).json({message: 'No products selected'});
        }
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const updatedDoc = await Order.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json(updatedDoc);
    } catch (error) {
        next(error);
    }
}