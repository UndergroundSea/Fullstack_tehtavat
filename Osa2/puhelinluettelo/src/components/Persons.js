import React from 'react'
import Name from './Name'

const Persons = ({ persons }) => {
    return (
      <div>
        {persons.map(name =>
              <Name key={name.id} name={name} number={name.number} />  
        )}
      </div> 
    )
}

export default Persons