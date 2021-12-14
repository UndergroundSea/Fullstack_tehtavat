import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
    createBlog,
}) => {
    const [newBlog, setNewBlog] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    
    const handleTitleChange = (event) => {
        setNewBlog(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog,
            author: newAuthor,
            url: newUrl,
        })
        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')
    }



    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    type="text"
                    value={newBlog}
                    name="Title"
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={newAuthor}
                    name="Author"
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={newUrl}
                    name="Url"
                    onChange={handleUrlChange}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm
