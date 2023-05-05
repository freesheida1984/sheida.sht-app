let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
let hoursFormat = hours.toString().padStart(2, '0');
let minutes = now.getMinutes();    
let minutesFormat = minutes.toString().padStart(2, '0');    
let seconds = now.getSeconds();
let secondsFormat = seconds.toString().padStart(2, '0');
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[now.getDay()];

h2.innerHTML = `${day} ${hoursFormat}:${minutesFormat}:${secondsFormat}`;


function showCityConditions(response){
    console.log(response.data);        
    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function searchCity(city){
    let apiKey = "604ffe224d5eba150eec847cdda1ec90";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;               
    axios.get(apiUrl).then(showCityConditions);
}

function searchLocation(position){
    let apiKey = "604ffe224d5eba150eec847cdda1ec90";   
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}
    &appid=${apiKey}&units=metric`;              
    axios.get(apiUrl).then(showCityConditions);    
}

function getPosition(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function handleSubmit(event){
    event.preventDefault();        
    let city = document.querySelector("#search-city-input").value;
    searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 
searchCity("New York"); 

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click" , getPosition)  