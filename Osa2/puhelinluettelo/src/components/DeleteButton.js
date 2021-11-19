import { React, useEffect } from 'react'
import axios from 'axios'

const Remove = (event, { id }) => {
    event.preventDefault()
    console.log('http://localhost:3001/persons/', { id })
    debugger
    axios.delete('http://localhost:3001/persons/', { id })
}

const deleteTodo = ({id}) => {
    console.log('http://localhost:3001/persons/', { id })
    debugger
    axios.delete('http://localhost:3001/persons/', { id })
  }

const DeleteButton = (props) => {
    return (
        <div>
            <button onClick={() => props.onDelete(props.id)}>delete</button>
        </div>
    )
}

export default DeleteButton