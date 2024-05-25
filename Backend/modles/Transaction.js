const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Transaction', transactionSchema);