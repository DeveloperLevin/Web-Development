const API_KEY = "405731ffa8b8ef8788518936d15aae6b"

const weatherDataElement = document.querySelector('#weather')
const btn = document.querySelector('#submit')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    const city = document.querySelector('#city').value;
    console.log(city)

    const getWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    
            if (!response.ok) {
                throw new Error("Network response was not okay")
            }
    
            const data = await response.json()
            
            const temperature = Math.round(data.main.temp)
            const description = data.weather[0].description
            const icon = data.weather[0].icon

            const details = [
                `Feels like: ${data.main.feels_like}°C`,
                `Humidity: ${data.main.humidity}%`,
                `Wind Speed: ${data.wind.speed} m/s`
            ]

            weatherDataElement.style.display = "block"

            weatherDataElement.querySelector('img').src = `http://openweathermap.org/img/wn/${icon}.png`
            weatherDataElement.querySelector('.temp').textContent = `${temperature}°C`
            weatherDataElement.querySelector('p').textContent = `${description}`

            weatherDataElement.querySelector('.details').innerHTML = details.map( (detail) => `<div class="box">${detail}</div>`).join("")
    
        } catch (error) {
            weatherDataElement.style.display = "block"
            weatherDataElement.querySelector('img').src = ""
            weatherDataElement.querySelector('img').style.visibility= "hidden"
            weatherDataElement.querySelector('.temp').textContent = ""
            weatherDataElement.querySelector('p').textContent = "An Error occured, please try again"
            weatherDataElement.querySelector('.details').innerHTML = ""
        }
    }

    getWeatherData(city)
})




