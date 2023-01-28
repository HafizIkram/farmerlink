const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    farmerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: {
        type: [String],
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ['kg', 'g', 'mg', 'lb', 'oz']
    },
    category: {
        type: String,
        required: true,
        enum: ['Fruits', 'Vegetables', 'meats', 'dairy', 'grains', 'nuts', 'spices', 'herbs', 'other']
    }
}, { timestamps: true });

module.exports = model('Product', productSchema);