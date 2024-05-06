const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    course : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    learner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Learner'
    },
    progress: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);