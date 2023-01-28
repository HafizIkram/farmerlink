const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    organization: {
        type: String,
        required: false
    },
    isFarmer: {
        type: Boolean,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('User', userSchema);