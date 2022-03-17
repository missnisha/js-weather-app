

export async function getCurrentWeather() {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=a4f57588fbcc5b810bb559df2b4a1dc4" );
    if (!response.ok) return {
        isError: true,
        data: null
    }
    const data = await response.json()
    return {
        isError: false,
        data, //shorthand property name
    }
    
}
