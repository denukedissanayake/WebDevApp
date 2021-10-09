const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: email,
        required: true
    },
    password: {
        type: password,
        required: true
    },
    accesType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', usersSchema)