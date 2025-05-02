const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    number_of_lessons: {
        type: Number,
        required: true
    },
    lesson: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    }],
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }],
    rating: {
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        numberOfRatings: {
            type: Number,
            default: 0,
            min: 0
        }
    }
}, {timestamps: true});

module.exports = mongoose.model('Course', courseSchema);
