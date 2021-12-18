import React from 'react'

const Error = ({ error }) => {
  if (error === ' ') {
    return null
  }

  return (
    <div className="error">
      Wrong username or password
    </div>
  )
}

export default Error