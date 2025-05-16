// const API_KEY = import.meta.env.VITE_API_KEY;
// const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

const BASE_URL = `http://localhost:3000/weather/`;

const show = async (city) => {
    try{
        const res = await fetch(BASE_URL + city)
        const data = await res.json()
        console.log("Data:", data)
        return data;
        
    } catch (err) {
        console.log(err)
    }
}

// show('23451')

export {show}