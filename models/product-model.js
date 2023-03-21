const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    lager: {
        type: Number,
        required: true,
        min: 0
    }
},

{timestamps: true}

);

module.exports = mongoose.model('product', ProductSchema)