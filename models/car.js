const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, max: 10 }],
    tags: {
        car_type: { type: String },
        company: { type: String },
        dealer: { type: String },
        model: { type: String },
        color: { type: String },
    },
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
