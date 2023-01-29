const Order = require('../models/orders');

exports.create = async (req, res, next) => {
    try {
        const {products, userId} = req.body;
        if(!products || products.length === 0) {
            return res.status(400).json({message: 'No products found'});
        }
        const bulkOpt = products.map(product => {
            return {
                insertOne: {
                    document: {
                        userId,
                        productId: product._id,
                        quantity: product.quantity,
                        weight: product.weight,
                        units: product.units,
                        price: product.price,
                        farmerId: product.farmerId
                    }
                }
            }
        });
        const orders = await Order.bulkWrite(bulkOpt);
        res.status(201).json(orders);
    } catch (error) {
        res.status(500).json(error.message);
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

exports.filter = async (req, res, next) => {
    const {userId, status} = req.body;
    let query = {
        userId
    };
    if(status) {
        query.status = status;
    }
    try {
        const orders = await Order.find(query).populate('productId userId farmerId', 'name address');
        res.status(200).json(orders);
    } catch (error) {
        next(error.message);
    }
}

exports.getByFarmer = async (req, res, next) => {
    try {
        const orders = await Order.find({farmerId: req.params.id}).populate('productId userId', 'name');
        res.status(200).json(orders);
    } catch (error) {
        next(error.message);
    }
}