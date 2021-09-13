import React from "react"
import personsService from '../services/persons'

const Persons = ({persons, setPersons, setMessage}) => {
    const deleteContact = (id, name) => {
        console.log(setPersons)
        if(window.confirm(`Delete ${name}?`)){
            personsService
                .deleteObj(id)
                .then(rta => {
                    console.log('rta', rta)
                    setPersons(persons.filter( persona => persona.id !== id))
                    setMessage('Contacto eliminado correctamente.')
                })
                .catch( error => {
                    setMessage('No se pudo eliminar el contacto.')
                })
        }
    }
    return (
        <>
            {
                persons.map(
                    person => (
                        person
                            ? (
                                <div key={person.id}>
                                    {person.name} | {person.number}
                                    <button onClick={() => { deleteContact(person.id, person.name) }}>delete</button>
                                </div>
                                )
                            : ''
                    )
                )
            }
        </>
    )
}

export default Persons