import React, { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {

        const [ newName, setNewName ] = useState('')
        const [ newNumber, setNewNumber ] = useState('')
    
        const handleNewName = (event) => {
            setNewName(event.target.value)
        }
    
        const handleNewNumber = (event) => {
            setNewNumber(event.target.value)
        }

        const addContact = (event) => {
            event.preventDefault()
            const personObject = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            if (persons.find( (person) => person.name.toLowerCase() === newName.toLowerCase())){
                alert(`${newName} is already added to phonebook`)
            } else {
                setPersons(persons.concat(personObject))
                setNewName('')
                setNewNumber('')
            }
        }

    return (
        <form onSubmit={addContact}>
            <div>
                <label>Name: </label>
                <input
                    value={ newName }
                    onChange={ handleNewName }
                />
            </div>
            <div>
                <label>Number:</label>
                <input
                    value={ newNumber }
                    onChange={ handleNewNumber }
                />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm