const mongoose = require('mongoose');
const medicineSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String
        },
        description: {
            required: true,
            type: String
        },
        qty: {
            required: true,
            type: Number
        },
        cost: {
            required: true,
            type: Number
        },
        imageUrl:{
            requried: true,
            type: String
        }
}
);
module.exports = mongoose.model('medicines', medicineSchema);