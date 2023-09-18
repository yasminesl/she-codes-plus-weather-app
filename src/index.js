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
  return `${day} ${hours}: ${minutes}`;
}
// Finds Weather Information from search input
function search(event) {
  event.preventDefault();
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let units = "metric";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("h1");
  city.innerHTML = searchInput.value;

  let apiUrl = `${endPoint}q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let current = document.querySelector(".current-temp");
  current.innerHTML = `${temperature} °C`;

  let tempDescription = response.data.weather[0].description;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = `${tempDescription}`;

  let wind = Math.round(response.data.wind.speed * 2.237);
  let windSpeed = document.querySelector("#temperature-wind");
  windSpeed.innerHTML = `Wind: ${wind}km/h`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}

function showPosition(position) {
  let apiKey = "634e6o1ffb8b62f49ac8ta3960376144";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#weather-search-form");
form.addEventListener("submit", search);
