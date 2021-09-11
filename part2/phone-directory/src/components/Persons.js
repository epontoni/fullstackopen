import React from "react"
import personsService from '../services/persons'

const Persons = ({persons, setPersons}) => {
    const deleteContact = (id, name) => {
        console.log(setPersons)
        if(window.confirm(`Delete ${name}?`)){
            personsService
                .deleteObj(id)
                .then(rta => {
                    console.log('rta', rta)
                    setPersons(persons.filter( persona => persona.id !== id))
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