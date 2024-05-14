const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    instructor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Superior',
        required: true
    },
    videos: [
        {
            title: String,
            url: String
        }
    ],
    notes: [
        {
            title: String,
            content: String
        }
    ],
    quizzes: [
        {
            question: String,
            options: [String],
            correct: Number
        }
    ],
    thumbnail: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    approved: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Course', CourseSchema);