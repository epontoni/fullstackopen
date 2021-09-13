import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => {
        setTimeout( () => {
            setMessage(null)
        }, 3000)
    }, [message])
    
    useEffect(() => {
        personsService
            .getAll()
            .then(initialContacts => {
                setPersons(initialContacts)
            })
    }, [])

  return (
      <div>
            <h1>Phonebook</h1>
            <Notification message={message} />

            <Filter persons={persons}/>

            <h2>Add a new</h2>
            <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />

          <h2>Numbers</h2>
          <Persons persons={persons} setPersons={setPersons} setMessage={setMessage} />
      </div>
  );
}

export default App;
