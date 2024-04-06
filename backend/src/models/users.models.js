const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email)=>email.includes('@'), 
            message: 'not valid email (@)'
        }
    },
    password: {
        type: String, 
        required: true,
    }
})

module.exports = mongoose.model('users', userSchema)