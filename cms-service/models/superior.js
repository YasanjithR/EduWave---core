const mongoose = require('mongoose');

const SuperiorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['instructor', 'admin']
    }
});

module.exports = mongoose.model('Superior', SuperiorSchema);