function updateTime(timestamp) {
  let dayAndTime = new Date(timestamp);
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} - ${hours}:${minutes}`;
}
function showTemperature(response) {
  let currentCity = document.querySelector("#current-city-searched");
  currentCity.innerHTML = `${response.data.city}`;
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let currentTemperature = document.querySelector(".current-degrees");
  currentTemperature.innerHTML = `${temperature}°`;
  let currentHumidity = document.querySelector(".current-humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let currentWindSpeed = document.querySelector(".current-wind-speed");
  currentWindSpeed.innerHTML = `Wind: ${windSpeed}mph`;
  let currentDayAndTime = document.querySelector("#currentDayAndTime");
  currentDayAndTime.innerHTML = updateTime(response.data.time * 1000);
}
function presetSanDiego(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=San%20Diego&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}

let sanDiegoPosition = document.querySelector(".san-diego");
sanDiegoPosition.addEventListener("click", presetSanDiego);

function presetBismarck(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Bismarck&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}

let bismarckPosition = document.querySelector(".bismarck");
bismarckPosition.addEventListener("click", presetBismarck);

function presetBarcelona(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Barcelona&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}

let barcelonaPosition = document.querySelector(".barcelona");
barcelonaPosition.addEventListener("click", presetBarcelona);

function presetMykolaiv(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Mykolaiv&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}

let mykolaivPosition = document.querySelector(".mykolaiv");
mykolaivPosition.addEventListener("click", presetMykolaiv);

function enterCity(event) {
  event.preventDefault();
  let currentCitySearchBox = document.querySelector("#current-city-search-box");

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCitySearchBox.value}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

let apiKey = "0065c92bb38o03d36835f9t248bba38f";
function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}
function getPosition(event) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentLocationForm = document.querySelector(".current-location-button");
currentLocationForm.addEventListener("click", getPosition);
