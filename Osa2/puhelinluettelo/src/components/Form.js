import React from 'react'
import Button from './Button'

const Form = (props) => {
    return (
      <form onSubmit={props.addName}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <Button text="add" />
      </form>
    )
  }

export default Form