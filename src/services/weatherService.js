const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/weather`;

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