import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
    instructor_id: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true})

export default mongoose.model('Instructor', instructorSchema);
