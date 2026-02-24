
const mayWeather = "865b05a0d42e92e862162366135f013f";

const weatherDataEle = document.querySelector(".weather-data");

const cityNameEle = document.querySelector("#city-name");

const formEle = document.querySelector("form");

const imgIcon = document.querySelector(".icon");

formEle.addEventListener("submit", ()=>{
    const cityValue = cityNameEle.value;
    getWeatherData(cityValue);
})


async function getWeatherData(cityValue){

    try{
        
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${mayWeather}&units=metric`)
     if(!response.ok){
        throw new Error ("Network response is not ok!");
     }

     const data = await response.json();

    const temperature = Math.floor(data.main.temp)
    
    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;

    weatherDataEle.querySelector(".desc").textContent = `${description}`;
    // weatherDataEle.querySelector(".icon").textContent = `${icon}`;

    imgIcon.innerHTML =  `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;

    const details = [
        `Feels Like: ${Math.floor(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}`,
        `Wind Speed: ${data.wind.speed}`,
    ]

    weatherDataEle.querySelector(".details").innerHTML = details.map((details)=>{
        return `<div class="detail">${details}</div>`
    }).join("")

    // weatherDataEle.querySelector(".")
    }catch(error){
    
        weatherDataEle.querySelector(".temp") = ""
        imgIcon.innerHTML = ""
        weatherDataEle.querySelector(".desc").textContent = ("AN Error Occured!");
    console.log(error);

    }

}