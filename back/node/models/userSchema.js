import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['super', 'user','TA', 'instructor'],
        default: 'user'
    },

}, {timestamps: true})

export default mongoose.model('User', userSchema)
