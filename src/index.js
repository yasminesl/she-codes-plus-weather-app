let now = new Date();
let h3 = document.querySelector("h3");

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

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let date = now.getDate();
let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day}, ${month} ${date} ${hours}:${minutes}`;
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
