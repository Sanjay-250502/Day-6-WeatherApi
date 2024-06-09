import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
/*Images*/
import sun from "../assets/sun.png"
import snow from "../assets/snow.png"
import rain from "../assets/rain.png"
import drizzle from "../assets/drizzle.png"
import cloud from "../assets/cloud.png"



import WeatherDetails from './WeatherDetails';

const Weather = () => {

  let api_key = "20eebdb14a63731cdd3e348c5ff766e9"
  const [searchText,setSearchText] = useState("Chennai")

  const [icon,setIcon] = useState(sun);
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("Chennai")
  const [country,setCountry] = useState("GB")
  const [latitude,setLatitude] = useState(0)
  const [longitude,setLongitude] = useState(0)
  const [humidityText,setHumidityText] = useState(0)
  const [windText,setWindText] = useState(0)

  const [cityNotFound,setCityNotFound] = useState(false)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const weatherIconMap = {
    "01d":sun,
    "01n":sun,
    "02d":cloud,
    "02n":cloud,
    "03d":drizzle,
    "03n":drizzle,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow
  }
  const searchApi = async () => {
    setLoading(true)
    setError(null)

    try{
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${api_key}&units=Metric`)
      const data = await res.json()
      console.log(data)
      if(data.cod === "404"){
        console.log("City not found")
        setCityNotFound(true)
        setLoading(false)
        return;
      }
      setCity(data.name)
      setTemp(Math.floor(data.main.temp))
      setCountry(data.sys.country)
      setLatitude(data.coord.lat)
      setLongitude(data.coord.lon)
      setHumidityText(data.main.humidity)
      setWindText(data.wind.speed)

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || sun)
      setCityNotFound(false)
    }
    catch(error){
      console.error("An error occured:", error)
      setError("An error occured while fetching weather data.")
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    searchApi()
  },[])
  const handleCity = (e) => {
    setSearchText(e.target.value)
  }
  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      searchApi()
    }
  }

  return (
    <>
      <div className='container'>
        <div className="input-container">
            <input type="text" 
            className='cityInput' 
            placeholder='Search City'
            onChange={handleCity}
            value={searchText}
            onKeyDown={handleKeyDown}
            />
            <div className='search-icon' onClick={()=>searchApi()}>
               <span className='search-ico'><FaSearch/></span>
            </div>
        </div>
        
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not found</div>}
        
        {!loading  && !cityNotFound && <WeatherDetails 
        icon={icon} temp={temp} city={city} country={country} 
        latitude={latitude} longitude={longitude} humidityText={humidityText} windText={windText}
        />}

        <p className='copy-right'>
          Designed by <span> Sanjay❤️</span>
        </p>
      </div>
    </>
  )
}

export default Weather;