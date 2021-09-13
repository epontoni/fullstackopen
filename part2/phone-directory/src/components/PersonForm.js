import React, { useState } from 'react'
import personsService from '../services/persons'

const PersonForm = ({ persons, setPersons, setMessage }) => {

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

            const found = persons.find(
                person => person.name.toLowerCase() === newName.toLowerCase()
            )

            console.log('object found: ', found);
            console.log(found ? 'true' : 'false')

            // ¿Existe?
            if(found) {
                // ¿Desea editar?
                if(window.confirm(`${newName} is already to phonebook, replace the old number with a new one?`)){
                    const editedContact = {...found, number: newNumber}
                    personsService
                        .update(found.id, editedContact)
                        .then( returnedContact => {
                            console.log('returned contact: ', returnedContact)
                            const newContacts = persons.map( contact => {
                                if(contact.id === found.id) {
                                    return returnedContact
                                }
                                return contact
                            })
                            setMessage('Contacto editado correctamente')
                            console.log('Nuevo estado PERSONAS: ', newContacts)

                            setPersons(newContacts)
                            setNewName('')
                            setNewNumber('')
                        })
                        .catch( error => {
                            setMessage('Algo salió mal al intentar editar el contacto')
                            console.log(` algo salió mal al intentar editar el contacto`)
                        })

                } else {
                    return;
                }
            } else {
                // No existe, entonces lo creamos:
                const personObject = {
                    id: persons[persons.length-1].id + 1,
                    name: newName,
                    number: newNumber
                }
                console.log('Intentaremos crear contacto:', personObject)

                personsService
                    .create(personObject)
                    .then( returnedContact => {
                        console.log('Resolviendo promesa de creación de usuario.')
                        console.log('returned contact: ', returnedContact)
                        setPersons(persons.concat(returnedContact))
                        setNewName('')
                        setNewNumber('')
                        setMessage('Contacto creado correctamente')
                    })
                    .catch( error => {
                        setMessage('Algo salió mal crear el contacto')
                        console.log(`algo salió mal al crear el contacto`)
                    })
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