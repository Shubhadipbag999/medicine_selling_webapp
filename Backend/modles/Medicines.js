const mongoose = require('mongoose')
const medicineSchema = new mongoose.Schema({

    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    stock: { type: Number, required: true }
})

module.exports = mongoose.model('Medicines', medicineSchema);