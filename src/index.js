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

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityEnter");
  let heading = document.querySelector("h1");
  heading.innerHTML = `${cityInput.value}`;
}

let button = document.querySelector("#button");
button.addEventListener("click", enterCity);

function temperatureFahrenheit() {
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = `+77`;
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.classList.add("celsFahrenActive");
  let celsius = document.querySelector("#celsius");
  celsius.classList.remove("celsFahrenActive");
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", temperatureFahrenheit);

function temperatureCelsius() {
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = `+28`;
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.classList.remove("celsFahrenActive");
  let celsius = document.querySelector("#celsius");
  celsius.classList.add("celsFahrenActive");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", temperatureCelsius);

let apiKey = "6932b3c494b1a744dfaf6ee7c867c8fe";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
let lat = 0;
let lon = 0;

function myPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
}

navigator.geolocation.getCurrentPosition(myPosition);

function setWeather(response) {
  console.log(response);
  let temperature = response.data.main.temp;
  let tempRounded = Math.round(temperature);
  let currentCity = response.data.name;
  let description = response.data.weather[0].main;
  let weather = document.querySelector(".description");
  let city = document.querySelector("h1");
  let currentTemp = document.querySelector("#currentTemperature");
  weather.innerHTML = `${description}`;
  currentTemp.innerHTML = `${tempRounded}`;
  city.innerHTML = `${currentCity}`;
}

function getCurrentWeather() {
  axios.get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${lon}`).then(setWeather);
}

let buttonCurrent = document.querySelector("button");
buttonCurrent.addEventListener("click", getCurrentWeather);

function searchWeather() {
  let cityInput = document.querySelector("#cityEnter");

  axios.get(`${apiUrl}&appid=${apiKey}&q=${cityInput.value}`).then(setWeather);
}

let searchButton = document.querySelector("#button");
searchButton.addEventListener("click", searchWeather);
