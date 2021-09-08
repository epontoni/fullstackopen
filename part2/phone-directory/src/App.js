import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
    const [ persons, setPersons ] = useState([])
    
    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then( response => {
                setPersons(response.data)
            })
    }, [])

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
