import React from 'react'
import humidity from "../assets/humidity.jpg"
import wind from "../assets/wind.jpg"
const WeatherDetails = ({icon, temp, city, country, latitude, longitude, humidityText, windText}) => {
  return (
    <>
    <div className='image'>
        <img src={icon} className='sun-ico' alt='sun-image' />
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
        <div>
            <span className='latitude'>Latitude</span>
            <span>{latitude}</span>
        </div>
        <div>
            <span className='longitude'>Longitude</span>
            <span>{longitude}</span>
        </div>
    </div>
    <div className="data-container">
        <div className="element">
            <img src={humidity} alt='humidity' className='humidity-ico'/>
            <div className="data">
                <div className="humidity-percent">{humidityText}%</div>
                <div className="text">humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={wind} alt='wind' className='wind-ico'/>
            <div className="data">
                <div className="wind-percent">{windText} km/hr</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default WeatherDetails