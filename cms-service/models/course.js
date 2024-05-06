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
    approved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Course', CourseSchema);