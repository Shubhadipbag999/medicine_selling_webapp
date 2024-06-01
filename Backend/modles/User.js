const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    owner: {
        type: Boolean,
        default: false
    },
    authority: {
        type: Boolean,
        // default: false
    },
    cartData: {
        type: Object,
    },
    address: {
        type: String,
        required: true,
    },
    transaction: {
        type: Object,
    }

});

module.exports = mongoose.model('User', userSchema);