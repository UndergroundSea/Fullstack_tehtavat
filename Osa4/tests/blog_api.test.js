const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)//.set('Authorization', `Basic ${TOKEN}`)

const Blog = require('../models/blog')
const User = require('../models/user')



beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    await User.deleteMany({})
    let userObject = new User(helper.initialPerson[0])
    await userObject.save()
})



test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are ten blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the first blog is named React patterns', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('React patterns')
})

test('blogs can be added with post', async () => {
    const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        userId: "5a422aa71b54a676234d17f9",
        __v: 0
    }

    const userLogin = {
        username: "hellas5",
        password: "sal",
    }

   /* let userAfterLogin = await api
            .post('/api/login')
            .send(userLogin)
            .expect(200)
            .expect('Content-Type', /application\/json/)

    const userBody = userAfterLogin.body
    const usetoken = userBody.token*/


    const logtoken = jwt.sign(userLogin, process.env.SECRET)
    //const loginResponse = await api.post("/api/login").send(userLogin)
    //const token = loginResponse.body.token
    //console.log("TOKEN!!!!!!!!!!!!!!", token)
    //console.log("loginResponse.body!!!!!!!!!!!!!!", loginResponse.body)
    console.log("LOGTOKEN!!!!!!", logtoken)
    //console.log('Authorization', 'bearer ' + logtoken)
    //console.log('USETOKEN!!!!',usetoken)
    //console.log('USERBODY!!!!',userbody)
    //console.log("loginResponse!!!!!!!!!!!!!!", loginResponse)

    const base = {
        'Content-Type': 'application/json',
        Authorization: 'bearer '+ logtoken
    }
    console.log('Base:',base)

    await api
        .post('/api/blogs')
        .set(base)
        .send(newBlog)
        //.set({'Authorization': 'bearer '+logtoken})
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const titles = response.map(r => r.title)

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
        'Canonical string reduction'
    )
})

test('blogs are defined by id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('likes become 0 if not specified', async () => {
    const newBlog = {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        userId: "5a422aa71b54a676234d17f9",
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likes = response.body.map(r => r.likes)

    expect(likes[likes.length - 1]).toBe(0)
})

describe('title or url missing', () => {
    test('returns 400 if title is missing', async () => {
        const newBlog = {
            _id: "5a422bc61b54a676234d17fc",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            userId: "5a422aa71b54a676234d17f9",
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await helper.blogsInDb()

        expect(response).toHaveLength(helper.initialBlogs.length)
    })

    test('returns 400 if url is missing', async () => {
        const newBlog = {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2,
            userId: "5a422aa71b54a676234d17f9",
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await helper.blogsInDb()

        expect(response).toHaveLength(helper.initialBlogs.length)
    })
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newBlog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 8,
        __v: 0
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)
    const likes = blogsAtEnd.map(r => r.likes)

    expect(titles).toContain(blogToUpdate.title)
    expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes+1)
})

afterAll(() => {
    mongoose.connection.close()
})