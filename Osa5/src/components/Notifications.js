import React from 'react'

const Notification = ({ message }) => {
  if (message === ' ') {
    return null
  }

  if (message === 'error') {
    return (
      <div className="error">
        Title, author or url missing
      </div>
    )
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification