import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    lesson_id: {
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
    content: {
        video: {
            type: String,
            required: true
        },
        section: [{
            title: {
                type: String,
                required: true
            }, description: {
                type: String,
                required: true
            },

        }]
    },
    duration: {
        type: Number,
        required: true
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Lesson', lessonSchema);
