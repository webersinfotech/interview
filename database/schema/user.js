const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    }
})

const user = mongoose.model('user', userSchema)

module.exports = user