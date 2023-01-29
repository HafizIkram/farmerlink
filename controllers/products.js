const { ObjectId } = require('mongoose').Types;
const Product = require('../models/products');
const User = require('../models/users');

exports.getAll = async (req, res, next) => {
    try {
        const products = await Product.find({ farmerId: req.params.id });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.filter = async (req, res, next) => {
    const { categories, price, weight, farmerId } = req.body;

    let query = {};
    if (categories) query.category = { $in: categories };
    if (price) query['productList.price'] = { $lte: Number(price) };
    if (weight) query['productList.weight'] = { $gte: weight[0], $lte: weight[1] };
    if (farmerId) query.farmerId = {
        $in: farmerId.map(id => ObjectId(id))
    }
    const pipeline = [ 
        { $unwind: "$productList" },
        {
            $match: query,
        },
        {$group: {
            _id: "$_id",
            name: {$first: "$name"},
            category: {$first: "$category"},
            description: {$first: "$description"},
            farmerId: {$first: "$farmerId"},
            productList: {$push: "$productList"}
        }},
    ];
    
    await Product.aggregate(pipeline)
        .then(products => res.status(200).json(products))
        .catch(err => res.status(500).json({ message: 'Error retrieving products' }));
};


exports.getAllBrands = async (req, res, next) => {
    try {
        const brands = await User.find({isFarmer: true}, {organization: 1});
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            message: 'Product created successfully',
            length: 1
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await Product.updateOne({ _id: id }, { $set: req.body });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const { id } = req.params;
        const deleted = await Product.deleteOne({ _id: id });
        res.status(200).json({ message: 'deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
}