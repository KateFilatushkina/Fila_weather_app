function formatDate(timestamp) {
  // calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let tempTypeElement = document.querySelector("#tempType");
  tempTypeElement.type = "c";
  tempTypeElement.innerHTML = "&deg;C";

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "74b865ca5035f3429a2f339ef4d0bb28";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Lviv");

function celsiusToFahrenheit(c, elem) {
  elem.type = "f";
  elem.innerHTML = "&deg;F";
  return Math.round(c * (9 / 5) + 32, 0);
}
function fahrenheitToCelsius(f, elem) {
  elem.type = "c";
  elem.innerHTML = "&deg;C";
  return Math.round((f - 32) * (5 / 9), 0);
}

let tempTypeElement = document.querySelector("#tempType");

tempTypeElement.onclick = function () {
  let temperatureElement = document.querySelector("#temperature");
  let temp = parseInt(temperatureElement.innerHTML);

  if (this.type == "c") {
    temperatureElement.innerHTML = celsiusToFahrenheit(temp, this);
  } else {
    temperatureElement.innerHTML = fahrenheitToCelsius(temp, this);
  }
};
