import React, { useState } from 'react'

const BlogForm = ({
    createBlog,
    /*handleTitleChange,
    handleAuthorChange,
    handleUrlChange,*/
    //handleCreate,
    /*newBlog,
    newAuthor,
    newUrl*/
    user,
    //blogs
}) => {
    const [newBlog, setNewBlog] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    //const [blogs, setBlogs] = useState([])
    //const [user, setUser] = useState(null)

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
            user: user
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

export default BlogForm
