import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

import search_icon from '../../Components/Assets/search.png';
import cloud_icon from '../../Components/Assets/cloud.png';
import wind_icon from '../../Components/Assets/wind.png';
import humidity_icon from '../../Components/Assets/humidity.png';
import snow_icon from '../../Components/Assets/snow.png';
import rain_icon from '../../Components/Assets/rain.png';
import drizzle_icon from '../../Components/Assets/drizzle.png';
import sunny_icon from '../../Components/Assets/clear.png';

export const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('London'); // Default city

    const api_key = "6d8adefcb44fcf1da116146ea23dbf4f";

    const search = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
        }
    };

    useEffect(() => {
        search();
    }, []); 

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    // Function to determine the weather condition and return the appropriate icon
    const getWeatherIcon = () => {
        if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
            return cloud_icon; // Default icon
        }
        const weatherCondition = weatherData.weather[0].main.toLowerCase();
        switch (weatherCondition) {
            case 'snow':
                return snow_icon;
            case 'rain':
                return rain_icon;
            case 'drizzle':
                return drizzle_icon;
            case 'clear':
                return sunny_icon;
            default:
                return cloud_icon; // Default icon
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input
                    type="text"
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress} 
                    className="cityInput"
                />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="search" />
                </div>
            </div>
            {weatherData && (
                <>
                    <div className='weather-image'>
                        <img src={getWeatherIcon()} alt="" /> {/* Call the function to get the weather icon */}
                    </div>
                    <div className="weather-temp">{Math.round(weatherData.main.temp)}°C</div>
                    <div className="weather-location">{weatherData.name}</div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidity_icon} className="icon" alt="" />
                            <div className="data">
                                <div className="humidity-percentage">{weatherData.main.humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={wind_icon} className="icon" alt="" />
                            <div className="data">
                                <div className="wind-speed">{weatherData.wind.speed} km/h</div>
                                <div className="text">Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};