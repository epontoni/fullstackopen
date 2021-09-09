import React, { useState } from 'react'
import axios from 'axios'
import CountryView from './components/CountryView'

const App = () => {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState([])

    const handleSearchInput = (event) => {
        setQuery(event.target.value)
        axios
        .get(`https://restcountries.eu/rest/v2/name/${query}`)
        .then( response => setCountries(response.data))
        .catch( err => console.log('Algo salió mal...', err))
    }

    const showCountry = (code) => {
        return function () {
            const selectedCountry = countries.filter(country => country.numericCode === code)
            setCountry(selectedCountry)
        }
    }

  return (
    <>
        <form>
            <label>Find countries: </label>
            <input
                value={query}
                onChange={handleSearchInput}>
            </input>
        </form>
        <div>
            { countries.length > 10
                ? "Too many matches, specify another filter"
                : countries.length === 1
                    ? ( 
                        <CountryView country={countries[0]} />
                    )
                    : countries.map( (country) =>  <p key={country.name}>{country.name} | { country.numericCode } <button onClick={showCountry(country.numericCode)}>show</button></p> ) }
        </div>
        <div>
            { (country.length === 1 && countries.length > 1)
                ? <CountryView country={country[0]} />
                : ''
            }
        </div>
        
    </>
  );
}

export default App;
