const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs, sameLikes } = require('./test_lists')
const TestBlog = require('../models/test_model')

const oneBlog = listWithOneBlog
const manyBlogs = blogs
const sameAmmount = sameLikes

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(5)
    })

    test('when list has many blogs equal the likes of these', () => {
        const result = listHelper.totalLikes(manyBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('when all blogs have different amount of likes', () => {
        const result = listHelper.favoriteBlog(manyBlogs)
        const wanted = new TestBlog({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
            _id: false
        })
        expect(result).toEqual(wanted)
    })

    test('when some blogs have the same amount of likes', () => {
        const result = listHelper.favoriteBlog(sameAmmount)
        const wanted = new TestBlog({
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 12,
            _id: false
        })
        expect(result).toEqual(wanted)
    })
})

describe('most common writer', () => {
    test('most common writer in an array', () => {
        const result = listHelper.mostCommonWriter(manyBlogs)
        const wanted = new TestBlog({
            author: "Robert C. Martin",
            blogs: 3,
            _id: false
        })
        /*console.log('RESULT:', result)
        console.log('WANTED:', wanted)*/
        expect(result).toEqual(wanted)
    })
})

describe('most likes', () => {
    test('writer that has most likes in his or her blogs', () => {
        const result = listHelper.mostLikes(manyBlogs)
        const wanted = new TestBlog({
            author: "Edsger W. Dijkstra",
            likes: 17,
            _id: false
        })
        expect(result).toEqual(wanted)
    })
})