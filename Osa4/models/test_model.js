const mongoose = require('mongoose')

const subSchema = mongoose.Schema({}, {_id: false})

const testSchema = mongoose.Schema({
    title: String,
    author: String,
    likes: Number,
    blogs: Number,
    _id: Boolean
})

module.exports = mongoose.model('TestBlog', testSchema)