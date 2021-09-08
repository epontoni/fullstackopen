import React, { useState } from "react"

const Filter = ({persons}) => {

    const [ search, setSearch ] = useState('')
    const [ encontrado, setEncontrado] = useState([])

    const handleSearch= (event) => {
        console.log(event.target.value.toLowerCase())
        let encontrados = persons.filter(
            person => person.name.toLowerCase().startsWith(event.target.value.toLowerCase())
        )
        
        setSearch(event.target.value)
        setEncontrado(encontrados)
    }
    return (
        <>
            <p>filter shown with <input value={search} onChange={handleSearch}/></p>
            <div>
                { encontrado.map( f => <p key={f.id}>{f.name} | {f.number}</p>) }
            </div>
        </>
    )
}

export default Filter