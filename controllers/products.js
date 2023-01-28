const {ObjectId} = require('mongoose').Types;
const Product = require('../models/products');

exports.getAll = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
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
        const { productList } = req.body;
        let prodList = [];
        let obj = {
            name:req.body.name,
            images: req.body.images,
            description: req.body.description,
            category: req.body.category,
            farmerId: req.body.farmerId,
        }
        if(productList.length) {
            for(const ele of productList) {
                prodList.push({
                    insertOne: {
                        document: {
                            ...obj,
                            price: ele.price,
                            quantity: ele.quantity,
                            weight: ele.weight,
                            unit: ele.unit
                        }
                    }
                })
            }
        }
        await Product.bulkWrite(prodList);
        res.status(201).json({
            message: 'Product created successfully',
            length: prodList.length
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updated = await Product.updateOne({_id: id}, {$set: req.body});
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const {id} = req.params;
    try {
        const {id} = req.params;
        const deleted = await Product.deleteOne({_id: id});
        res.status(200).json({message:'deleted'});
    } catch (error) {
        res.status(500).json(error);
    }
}