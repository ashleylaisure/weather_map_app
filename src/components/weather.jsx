import {useState, useEffect} from 'react'

import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'
import loadingGif from '../assets/images/loading.gif'


const Weather = () => {
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)

    const api_key = "247662426988f015cc27f4f779500a05"

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            setLoading(true)
            const defaultLocation = "New York"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=imperial&appid=${api_key}`

            const res = await fetch(url)
            const defaultdata = await res.json()

            setData(defaultdata)
            setLoading(false)
    }
    fetchDefaultWeather()
}, [])

    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    const search = async () => {
        if(location.trim() !== '') {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${api_key}`

            const res = await fetch(url)
            const searchData = await res.json()

            if(searchData.code !== 200) {
                setData({notFound: true})
            } else {
                setData(searchData)
                setLocation('')
            }

            setLoading(false)
            console.log(searchData)

            
        }
        
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search()
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
        Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
        Clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
        Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
        Thunderstorm: "linear-gradient(to right, #5bc8fb, #80eaff)",
        Drizzle: "linear-gradient(to right, #5bc8fb, #80eaff)",
        Snow: "linear-gradient(to right, #aff2ff, #ffffff)",
        Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
        Mist: "linear-gradient(to right, #57d6d4, #71eeec)",
        Fog: "linear-gradient(to right, #57d6d4, #71eeec)",
    }

    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : "linear-gradient(to right, #f3b07c, #fcd283)"

    const currentDate = new Date()

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const weekDay = weekDays[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    const day = currentDate.getDate()

    const formattedDate = `${weekDay}, ${day} ${month}`

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
                            placeholder="Enter Location"
                            value={location}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}/>
                        <i className="fa-solid fa-magnifying-glass"
                            onClick={search}></i>
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
                        <img src={weatherImage} alt="sunny" />
                        <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                        <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°F` : null}</div>
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
