const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    url: { type: String }
}, { timestamps: true })

const model = mongoose.model('products', product);

module.exports = model