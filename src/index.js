function formatDate(timestamp) {
  let date = new Date(timestamp);
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

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
// Finds Weather Information from search input
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("h1");
  city.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "634e6o1ffb8b62f49ac8ta3960376144";
  let units = "metric";
  let endPoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${endPoint}query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  celsiusTemperature = Math.round(response.data.temperature.current);
  let current = document.querySelector(".current-temp");
  current.innerHTML = `${celsiusTemperature}`;

  let tempDescription = response.data.condition.description;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = `${tempDescription}`;

  let wind = Math.round(response.data.wind.speed * 2.237);
  let windSpeed = document.querySelector("#temperature-wind");
  windSpeed.innerHTML = `Wind: ${wind}km/h`;

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  showCelsiusTemperature({ preventDefault: function () {} });
}

function showPosition(position) {
  let apiKey = "634e6o1ffb8b62f49ac8ta3960376144";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

searchCity("Charlotte");

let form = document.querySelector("#weather-search-form");
form.addEventListener("submit", search);
