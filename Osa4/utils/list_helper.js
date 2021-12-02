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

const mostCommonWriter = (blogs) => {
    const authors = []
    const written = []
    const blog = new TestBlog({
        author: '',
        blogs: 0,
        _id: false
      })

    for (let i = 0; i < blogs.length; i++) {
        if (authors.includes(blogs[i].author)) {
            written[authors.indexOf(blogs[i].author)]++
        } else {
            authors.push(blogs[i].author)
            written.push(1)
        }
    }
    /*console.log('AUTHOR:',authors[written.indexOf(Math.max(written))])
    console.log('AUTHORS:',authors)
    console.log('WRITTEN:',written)
    console.log('INDEX:',written.indexOf(Math.max(written)))
    console.log('MAX:',Math.max(...written))*/
    blog.author = authors[written.indexOf(Math.max(...written))]
    blog.blogs = written[written.indexOf(Math.max(...written))]
    return blog
}

const mostLikes = (blogs) => {
    const authors = []
    const likes = []
    const blog = new TestBlog({
        author: '',
        likes: 0,
        _id: false
      })

    for (let i = 0; i < blogs.length; i++) {
        if (authors.includes(blogs[i].author)) {
            likes[authors.indexOf(blogs[i].author)] += blogs[i].likes
        } else {
            authors.push(blogs[i].author)
            likes.push(blogs[i].likes)
        }
    }

    blog.author = authors[likes.indexOf(Math.max(...likes))]
    blog.likes = likes[likes.indexOf(Math.max(...likes))]
    return blog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostCommonWriter,
    mostLikes
}