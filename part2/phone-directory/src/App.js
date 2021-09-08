import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [ persons, setPersons ] = useState([
        { id: 1, name: 'Arto Hellas', number: '040-123456' },
        { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
        { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
        { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

  return (
      <div>
            <h1>Phonebook</h1>

            <Filter persons={persons}/>

            <h2>Add a new</h2>
            <PersonForm persons={persons} setPersons={setPersons}/>

          <h2>Numbers</h2>
          <Persons persons={persons} />
      </div>
  );
}

export default App;
