import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])

    const handleSearchInput = (event) => {
        setQuery(event.target.value)
        axios
        .get(`https://restcountries.eu/rest/v2/name/${query}`)
        .then( response => setCountries(response.data))
        .catch( err => console.log('Algo salió mal...', err))
    }

    /* const handleSearch = (event) => {
        event.preventDefault()
        axios
            .get(`https://restcountries.eu/rest/v2/name/${query}`)
            .then( response => setCountries(response.data))
    } */

  return (
    <>
        <form>
            <label>Find countries: </label>
            <input value={query} onChange={handleSearchInput}></input>
        </form>
        <div>
            { countries.length > 10
                ? "Too many matches, specify another filter"
                : countries.length === 1
                    ? (
                        <>
                            <h2>{ countries[0].name }</h2>
                            <p>Capital: { countries[0].capital }</p>
                            <p>Population: { countries[0].population }</p>
                            <h3>Languages</h3>
                            <ul>
                                { countries[0].languages.map( lang => <li key={lang.name}> {lang.name} </li>) }
                            </ul>
                            <img src={ countries[0].flag } alt={countries[0].name + 'Flag'} />
                        </>
                    )
                    : countries.map( (country) =>  <p key={country.name}>{country.name}</p> ) }
        </div>
    </>
  );
}

export default App;
