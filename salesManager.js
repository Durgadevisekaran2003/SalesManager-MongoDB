const mongoose = require('mongoose');

const salesManagerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    hireDate: { type: Date, default: Date.now },
    performanceRating: { type: Number, default: 0 },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    }
});

const SalesManager = mongoose.model('SalesManager', salesManagerSchema);

module.exports = SalesManager;
