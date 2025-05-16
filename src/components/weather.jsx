import {useState, useEffect} from 'react'
import * as weatherService from '../services/weatherService';

import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'
import loadingGif from '../assets/images/loading.gif'

const Weather = () => {
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            setLoading(true)
            const defaultLocation = "New York"
            const defaultdata = await weatherService.show(`${defaultLocation}`)

            setData(defaultdata)
            setLoading(false)
    }
    fetchDefaultWeather()
}, [])

    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    const handleSearch = async () => {
        setLoading(true)
        // check that the string is not empty or just whitespace " ".trim() becomes an empty string
        if(location.trim() !== '') {
            const data = await weatherService.show(`${location}`)
            console.log('Data', data)

            if (data.cod !== 200) {
                setData({notFound: true})
            } else {
                setData(data)
                setLocation('')
            }

        } 
        setLoading(false)

    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    const weatherImages = {
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Thunderstorm: rainy,
        Drizzle: rainy,
        Snow: snowy,
        Haze: cloudy,
        Mist: cloudy,
        // Smoke: cloudy
        // Dust: cloudy
        Fog: cloudy,
        // Sand:
        // Ash:
        // Squall:
        // Tornado:
    }

    const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null

    const backgroundImages = {
        Clear: "linear-gradient(to right, var(--orange-200), var(--orange-400))",
        Clouds: "linear-gradient(to right, var(--teal-200), var(--teal-400))",
        Rain: "linear-gradient(to right, var(--blue-200),var(--blue-400))",
        Thunderstorm: "linear-gradient(to right,var(--blue-200),var(--blue-400))",
        Drizzle: "linear-gradient(to right,var(--blue-200),var(--blue-400))",
        Snow: "linear-gradient(to right, var(--white-200), var(--white-400))",
        Haze: "linear-gradient(to right,var(--teal-200), var(--teal-400))",
        Mist: "linear-gradient(to right,var(--teal-200), var(--teal-400))",
        Fog: "linear-gradient(to right,var(--teal-200), var(--teal-400))",
    }

    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : backgroundImages["Clear"]
    const currentDate = new Date()

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const weekDay = weekDays[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    const day = currentDate.getDate()

    const formattedDate = `${weekDay}, ${month} ${day} `

    return (
        <div className="container" style={{backgroundImage}}>
            <div className="weather-app" 
                style={{backgroundImage : 
                    backgroundImage && backgroundImage.replace ?
                        backgroundImage.replace("to right", "to top") : null
                }}>
                <div className="search">
                    <div className="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="location">{data.name}</div>
                    </div>
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Enter City or Zip"
                            value={location}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}/>
                        <i className="fa-solid fa-magnifying-glass"
                            onClick={handleSearch}>
                        </i>
                    </div>
                </div>
                {loading ? (
                    <img className="loader" src={loadingGif} alt="loading"/>

                ) : 
                    data.notFound ? (
                        <div className="not-found">
                            Not Found &#128529;
                        </div>
                ) : (
                <>
                    <div className="weather">
                        <div class="image-container">
                            <img src={weatherImage} alt="sunny" />
                        </div>
                        
                        <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                        
                        <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°F` : null}</div>

                        <div className="weather-temp">
                            <div className="high-temp">
                                <div className="data-temp">High:</div>
                                <div className="small-temp">{data.main ? `${Math.floor(data.main.temp_max)}°` : null}</div>
                            </div>

                            <div className="low-temp">
                                <div className="data-temp">Low:</div>
                                <div className="small-temp">{data.main ? `${Math.floor(data.main.temp_min)}°` : null}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="weather-date">
                        <p>{formattedDate}</p>
                    </div>
                    <div className="weather-data">
                        <div className="humidity">
                            <div className="data-name">Humidity</div>
                            <i className="fa-solid fa-droplet"></i>
                            <div className="data">{data.main ? data.main.humidity : null}%</div>
                        </div>

                        <div className="wind">
                            <div className="data-name">Wind</div>
                            <i className="fa-solid fa-wind"></i>
                            <div className="data">{data.wind ? data.wind.speed : null }miles/hr</div>
                        </div>
                    </div>
                </>
                )}

            </div>
        </div>
    )
}

export default Weather
