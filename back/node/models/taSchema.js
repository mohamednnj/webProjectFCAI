import mongoose from 'mongoose';

const taSchema = new mongoose.Schema({
        ta_id: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        course: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }]
    }, {timestamps: true}
);
export default mongoose.model('Ta', taSchema);
