function updateTime() {
  let dayAndTime = new Date();
  let currentDayAndTime = document.querySelector("#currentDayAndTime");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayAndTime.getDay()];
  let hours = dayAndTime.getHours();
  let minutes = dayAndTime.getMinutes();
  currentDayAndTime.innerHTML = `${day} - ${hours}:${minutes}`;
}
updateTime();

function showTemperature(response) {
  let currentCity = document.querySelector("#current-city-searched");
  currentCity.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let currentTemperature = document.querySelector(".current-degrees");
  currentTemperature.innerHTML = `${temperature}°`;
  let currentHumidity = document.querySelector(".current-humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let currentWindSpeed = document.querySelector(".current-wind-speed");
  currentWindSpeed.innerHTML = `Wind: ${windSpeed}mph`;
}
function presetSanDiego(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=San%20Diego&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}

let sanDiegoPosition = document.querySelector(".san-diego");
sanDiegoPosition.addEventListener("click", presetSanDiego);

function presetBismarck(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Bismarck&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}

let bismarckPosition = document.querySelector(".bismarck");
bismarckPosition.addEventListener("click", presetBismarck);

function presetBarcelona(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}

let barcelonaPosition = document.querySelector(".barcelona");
barcelonaPosition.addEventListener("click", presetBarcelona);

function presetMykolaiv(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Mykolaiv&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}

let mykolaivPosition = document.querySelector(".mykolaiv");
mykolaivPosition.addEventListener("click", presetMykolaiv);

function enterCity(event) {
  event.preventDefault();
  let currentCitySearchBox = document.querySelector("#current-city-search-box");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCitySearchBox.value}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}
function getPosition(event) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentLocationForm = document.querySelector(".current-location-button");
currentLocationForm.addEventListener("click", getPosition);
