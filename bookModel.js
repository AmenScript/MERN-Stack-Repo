const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publishedDate:{
        type: Date,
        required: true
    },
    pages:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        required: false
    },

})

const book = new mongoose.model('book', bookSchema)

module.exports = book