import React, { useState } from 'react'

const Name = ({ name }) => {
  return (
    <p>{name.name}</p>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' , id: 0}
  ]) 
  const [ names, setNames] = useState(['Arto Hellas'])
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
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
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(name =>
          <Name key={name.id} name={name} />  
        )}
      <div>debug: {newName}</div>
      <div>debug: {names}</div>
    </div>
  )

}

export default App