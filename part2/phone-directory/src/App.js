import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons ] = useState([ { name: 'Arto Hellas', id: 1 } ])
    const [ newName, setNewName ] = useState('')

    const handleNewName = (event) => {

        setNewName(event.target.value)
    }

    const addContact = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            id: persons.length + 1
        }
        setPersons(persons.concat(personObject))
        setNewName('')
    }

  return (
      <div>
          <h1>Phonebook</h1>
          <form onSubmit={addContact}>
              <div>
                  name: <input value={newName} onChange={handleNewName} />
              </div>
              <div>
                 <button type="submit">add</button>
              </div>
          </form>
          <h2>Numbers</h2>
          { persons.map (person => <div key={person.id}> {person.name} </div>)}
          <div>debug: {newName}</div>
      </div>
  );
}

export default App;
