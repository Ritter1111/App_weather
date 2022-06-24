setInterval(() => FormatDate(), 1000);
function FormatDate() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let dayn = now.getDate();
  let year = now.getFullYear();

  let da = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let mo = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = mo[now.getMonth()];
  let dayss = da[now.getDay()];
  let dia= `${dayss}, ${month} ${dayn}, ${year}, ${hour}:${min}`;
  let two = `${dayss}, ${hour}:${min}`
  let currentDay = `${dayss}`;
  document.getElementById("currentDay").innerHTML = currentDay;
  document.getElementById("date_now").innerHTML = dia;
  document.getElementById("date_id").innerHTML = two;
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
    return days[day];
}

function displayForecast(response){
    let forecast = response.data.daily;
   
    let forecastElement = document.querySelector("#forecastW");
    let forecastHTML = `<div class="row">`;
   
      forecast.forEach(function(forecastDay, index) {
          if(index<6){
        forecastHTML = forecastHTML + `
        <div class="col">
            <h7>${formatDay(forecastDay.dt)}</h7>
            <h3><img src= "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt=""
            width="72"></h3>
            <h7>${Math.round(forecastDay.temp.max)}&deg / </h7>
            <h7>${Math.round(forecastDay.temp.min)}&deg</h7>
        </div>
   `;
          }
      });
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
console.log(coordinates);
let apiKey = "1801b872861c58c5bdc4c9b616dce426";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?
lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
    celciusTemperature =  response.data.main.temp;
  document.querySelector("#city_input").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#degrees_front").innerHTML = Math.round(celciusTemperature );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  
  document.querySelector("#pressure").innerHTML =response.data.main.pressure;
  document.querySelector("#cloud").innerHTML=response.data.weather[0].main;
  document.querySelector("#front-clear").innerHTML=response.data.weather[0].main;

  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "1801b872861c58c5bdc4c9b616dce426";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-in").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "1801b872861c58c5bdc4c9b616dce426";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#button_1");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Sofia");

let celciusTemperature = null;

function convert(event){
  event.preventDefault();
  let temperat = document.querySelector("#degree");
  let temperature = temperat.innerHTML;
  temperat.innerHTML = Math.round(celciusTemperature * 1.8 + 32); 
  celcius.classList.remove("link_2");
  farenheite .classList.add("link_2");
}

function convertCelcius(event){
  event.preventDefault();
  let tem = document.querySelector("#degree");
  let temperature1 = tem.innerHTML;
  tem.innerHTML = Math.round(celciusTemperature);
  celcius.classList.add("link_2");
  farenheite .classList.remove("link_2");
}

let farenheite = document.querySelector("#two_href");
farenheite.addEventListener("click", convert);

let celcius = document.querySelector("#one_href");
celcius.addEventListener("click", convertCelcius);