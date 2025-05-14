const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

const show = async (city) => {
    try{
        const queryString = `q=${city}`;
        const res = await fetch(BASE_URL + queryString + API_KEY)
        const data = await res.json()
        // console.log("Data:", data)
        return data;
        
    } catch (err) {
        console.log(err)
    }
}

// show('New York')

export {show}