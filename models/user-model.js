const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},

{timestamps: true}

);

module.exports = mongoose.model('user', UserSchema)