import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244', id: 0 }
  ])
  const [names, setNames] = useState(['Arto Hellas'])
  const [numbers, setNumbers] = useState(['040-1231244'])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    {
      (() => {
        switch (names.includes(nameObject.name)) {
          case true: return window.alert(`${newName} is already added to phonebook`);
          case false: return setPersons(persons.concat(nameObject)), setNames(names.concat(nameObject.name));
        }
      })()
    }

    axios
    .post('http://localhost:3001/persons', nameObject)
    .then(response => {
      console.log(response)
    })

    /*setPersons(persons.concat(nameObject))*/
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = useCallback((event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }, [newName])

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App