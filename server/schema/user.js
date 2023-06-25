const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        inventory: [ { type: String } ]
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)