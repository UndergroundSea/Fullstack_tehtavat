import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notifications'
import Errors from './components/Errors'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(' ')
  const [error, setError] = useState(' ')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } //else {
    //setError('1')
    //}
  }, [])

  /*const clearError = async (event) => {
    event.preventdefault()
    setError(' ')
  }*/

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong')
      setTimeout(() => {
        setError(' ')
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      setMessage('error')
      setTimeout(() => {
        setMessage(' ')
      }, 5000)
    }

    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} was added`)
      setTimeout(() => {
        setMessage(' ')
      }, 5000)
    })
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out with', username, password)
    window.localStorage.clear()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Errors error={error} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notifications message={message} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App