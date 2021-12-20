import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }, { ref }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /*const showUser = () => {
    console.log('HEYYYY', blog, 'hey', blog.user)
    if (blog.user) {
      return blog.user.name
    } else {
      return 'null'
    }
  }*/

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
      <div style={showWhenVisible}>
        {blog.url} <br /> likes {blog.likes} <button>like</button> <br /> {blog.user.name}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog