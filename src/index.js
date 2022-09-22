let apiKey = "6932b3c494b1a744dfaf6ee7c867c8fe";
let apiUrlNow = "https://api.openweathermap.org/data/2.5/weather?units=metric";
let apiUrlForecast =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric";
axios.get(`${apiUrlNow}&appid=${apiKey}&q=Kyiv`).then(setWeather);

let now = new Date();
let hours = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let nameDay = document.querySelector("#dayOfWeek");
nameDay.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
      <div class="col-2">
        <div class="forecast-day">${day}</div>
        <img class="forecast-image" src="images/01d.png" alt="sun" />
        <div class="forecast-degrees">
          <span class="weather-forecast-max">34º</span>/<span class="weather-forecast-min">19º</span>
        </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function convertToFahrenheit() {
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.classList.add("celsFahrenActive");
  let celsius = document.querySelector("#celsius");
  celsius.classList.remove("celsFahrenActive");
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius() {
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = celsiusTemp;
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.classList.remove("celsFahrenActive");
  let celsius = document.querySelector("#celsius");
  celsius.classList.add("celsFahrenActive");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

function getWeatherByPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios
    .get(`${apiUrlNow}&appid=${apiKey}&lat=${lat}&lon=${lon}`)
    .then(setWeather);
}
function getForecast(coordinates) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function setWeather(response) {
  let temperature = response.data.main.temp;
  let tempRounded = Math.round(temperature);
  let currentCity = response.data.name;
  let description = response.data.weather[0].main;
  let wind = response.data.wind.speed;
  let topIcon = response.data.weather[0].icon;
  let weather = document.querySelector(".description");
  let city = document.querySelector("h1");
  let currentTemp = document.querySelector("#currentTemperature");
  let windSpeed = document.querySelector(".windSpeed");
  let iconElement = document.querySelector(".top-image");

  celsiusTemp = tempRounded;

  iconElement.setAttribute("src", `images/${topIcon}.png`);
  weather.innerHTML = `${description}`;
  currentTemp.innerHTML = `${celsiusTemp}`;
  city.innerHTML = `${currentCity}`;
  windSpeed.innerHTML = `${wind} km/h`;

  getForecast(response.data.coord);
}

let celsiusTemp = null;

function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherByPosition);
  //navigator.geolocation.getCurrentPosition(getForecastByPosition);
}

let buttonCurrent = document.querySelector("#current-button");
buttonCurrent.addEventListener("click", getCurrentWeather);

function searchWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityEnter");

  axios
    .get(`${apiUrlNow}&appid=${apiKey}&q=${cityInput.value}`)
    .then(setWeather);
  cityInput.value = "";
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchWeather);
