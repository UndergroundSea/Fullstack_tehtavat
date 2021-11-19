import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Form from './components/Form'
import Notifications from './components/Notifications'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244', id: 0 }
  ])
  const [names, setNames] = useState(['Arto Hellas'])
  const [numbers, setNumbers] = useState(['040-1231244'])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(' ')

  const handleDeletePerson= id =>{
    const person=persons.find(p=>p.id===id)

    personService
      .remove(person.id)
      .then(()=>{
        personService
          .getPersons()
            .then((persons)=>{
              setPersons(persons)
            })
      })
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
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
          case false: personService
          .create(nameObject)
            .then(response => {
              setPersons(persons.concat(response))
              setNames(names.concat(response.name))
              setMessage(`${response.name} was added`)
            })
    
        }
      })()
    }

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
      <Notifications message={message}/>
      <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDeletePerson={()=>handleDeletePerson()} />
    </div>
  )

}

export default App