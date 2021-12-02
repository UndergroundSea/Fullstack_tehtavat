const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./test_lists')

const oneBlog = listWithOneBlog
const manyBlogs = blogs

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