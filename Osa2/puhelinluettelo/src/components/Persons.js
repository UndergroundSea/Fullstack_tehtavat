import React from 'react'
import Name from './Name'
import DeleteButton from './DeleteButton'
import axios from 'axios'

const Persons = ({ persons, handleDeletePerson }) => {
/*{
  const deleteTodo = ({id}) => {
    console.log('http://localhost:3001/persons/', { id })
    debugger
    axios.delete('http://localhost:3001/persons/', { id })
  }
}*/
    return (
      <div>
        {persons.map(name =>
              <Name key={name.id} name={name} number={name.number} handleDeletePerson={()=>handleDeletePerson(name.id)} />  
        )}
      </div> 
    )
}

export default Persons