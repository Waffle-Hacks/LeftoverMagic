const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema = new Schema({
    ingredient: { type: String, required: true },
    boughtSince: { type: Date, required: true },
});

const UserSchema = new Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        inventory: [ IngredientSchema ]
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)