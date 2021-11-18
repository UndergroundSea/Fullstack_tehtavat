import React, { useState } from 'react'
import Persons from './components/Persons'
import Button from './components/Button'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' , number:'040-1231244' , id: 0}
  ]) 
  const [ names, setNames] = useState(['Arto Hellas'])
  const [ numbers, setNumbers] = useState(['040-1231244'])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    {(() => {
      switch (names.includes(nameObject.name)) {
        case true:   return window.alert(`${newName} is already added to phonebook`);
        case false: return setPersons(persons.concat(nameObject)), setNames(names.concat(nameObject.name));
      }
    })()}
    
    /*setPersons(persons.concat(nameObject))*/
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
         value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <Button text="add" />
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App