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
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function forecastFormatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
let apiKey = "0065c92bb38o03d36835f9t248bba38f";

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class="row">';
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col">
      <div class="forecast-day">${forecastFormatDay(forecastDay.time)}</div>
          <img src ="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"/>
            <div class="forecast-range">
              <span class="temperature-max">${
                forecastDay.temperature.maximum
              }</span>
              <span class="temperature-min">${
                forecastDay.temperature.minimum
              }</span>
            </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(response) {
  console.log(response);
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${response}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}
function showTemperature(response) {
  let currentCity = document.querySelector("#current-city-searched");
  let currentDayAndTime = document.querySelector("#currentDayAndTime");
  let temperature = Math.round(response.data.temperature.current);
  let temperatureDescription = response.data.condition.description;
  temperatureDescription =
    temperatureDescription.charAt(0).toUpperCase() +
    temperatureDescription.slice(1);
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let currentTemperature = document.querySelector(".current-degrees");
  let currentTemperatureDescription = document.querySelector(
    "#current-temperature-description"
  );
  let currentHumidity = document.querySelector(".current-humidity");
  let currentWindSpeed = document.querySelector(".current-wind-speed");
  let currentTempIcon = document.querySelector("#current-temp-icon");

  fahrenheitTemperature = response.data.temperature.current;

  currentCity.innerHTML = `${response.data.city}`;
  currentDayAndTime.innerHTML = updateTime(response.data.time * 1000);
  currentTemperature.innerHTML = `${temperature}°`;
  currentTemperatureDescription.innerHTML = `${temperatureDescription}`;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  currentWindSpeed.innerHTML = `Wind: ${windSpeed}mph`;
  currentTempIcon.setAttribute("src", `${response.data.condition.icon_url}`);
  getForecast(response.data.city);
}

function presetSydney(event) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Sydney&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}
presetSydney();

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
  let currentCitySearchBox = document.querySelector("#current-city-search-box");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCitySearchBox.value}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
  updateTime();
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

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

let fahrenheitTemperature = null;

function showCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".current-degrees");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  currentTemperature.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let currentTemperature = document.querySelector(".current-degrees");
  currentTemperature.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
