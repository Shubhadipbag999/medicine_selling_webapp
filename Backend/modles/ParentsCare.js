const mongoose = require('mongoose');

const parentscareSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    medicineName: { type: String, required: true },
    time: { type: String, required: true },
    relationType: { type: String, required: true },
    mobileNumber: { type: Number, required: true }

})


module.exports = mongoose.model("ParentsCare", parentscareSchema) 