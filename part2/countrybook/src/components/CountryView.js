import React from "react"

const CountryView = ({country}) => {
        return (
            <>
                <h2>{ country.name }</h2>
                <p>Capital: { country.capital }</p>
                <p>Population: { country.population }</p>
                <h3>Languages</h3>
                <ul>
                    { country.languages.map( lang => <li key={lang.name}> {lang.name} </li>) }
                </ul>
                <img src={ country.flag } alt={country.name + 'Flag'} />
            </>
        )
}

export default CountryView