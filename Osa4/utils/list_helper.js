const TestBlog = require('../models/test_model')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    for (let i = 0; i < blogs.length; i++) {
        sum += blogs[i].likes
    }
    return sum
}

const favoriteBlog = (blogs) => {
    const blog = new TestBlog({
        title: '',
        author: '',
        likes: 0,
        _id: false
      })
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > blog.likes) {
            blog.title = blogs[i].title
            blog.author = blogs[i].author
            blog.likes = blogs[i].likes
        }
    }
    return blog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}