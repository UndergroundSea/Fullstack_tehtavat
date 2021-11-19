import {React, useEffect} from 'react'
import DeleteButton from './DeleteButton'
import axios from 'axios'

const Name = (props) => {
  return (
    <p>{props.name.name} {props.name.number} </p>
  )
}

export default Name


/*<button onClick={props.handleDeletePerson}>delete</button>*/