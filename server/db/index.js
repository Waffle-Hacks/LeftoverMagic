const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(e => {
        console.error('MongoDB connection error:', e.message)
    })

const db = mongoose.connection

module.exports = db