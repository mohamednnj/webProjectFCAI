const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true,
        unique: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, {timestamps: true});

module.exports = mongoose.model('Student', studentSchema);
