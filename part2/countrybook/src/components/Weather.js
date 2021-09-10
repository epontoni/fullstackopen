import axios from "axios"
import React, { useState, useEffect } from "react"

const API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({query}) => {
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect( ()=> {
        setLoading(true)
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`)
        .then( response => {
            setWeather(response.data)
            setLoading(false)
        })
        .catch( error => console.log('Error al cargar el clima', error))
    }, [query])
    const toCelsius = (f) => {
        return (f-32)* 5/9;
    }
    return (
        <>
            {
            loading 
            ? (
                <p>Cargando datos...</p>
            )
            : (Object.keys(weather).length !== 0)
                ? (
                    <div>
                    <p>Description: <span>{ weather.weather[0].description }</span></p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                    <p>Temp: <span>{toCelsius(weather.main.temp)}°C</span></p>
                    <p>max: <span>{toCelsius(weather.main.temp_max)}°C</span></p>
                    <p>min: <span>{toCelsius(weather.main.temp_min)}°C</span></p>
                    </div>
                )
                : <p>Objeto vacío</p>
            }
            
        </>
    )
}

export default Weather


