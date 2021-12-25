//c1 display the current date and time
//using JavaScript: Tuesday 16:00
let now = new Date();

function datetime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
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
    "December",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour > 12) {
    hour = hour - 12;
  } else {
    hour = hour;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = minutes;
  }

  let month = months[now.getMonth()];
  let dayNumber = now.getDate();
  let year = now.getFullYear();
  let minutes = now.getMinutes();
  let ampm = now.getHours();

  if (ampm > 12) {
    ampm = "pm";
  } else {
    ampm = "am";
  }

  let formattedDate = `${day}, ${month} ${dayNumber}, ${year} at ${hour}:${minutes} ${ampm}`;
  return formattedDate;
}

let current = document.querySelector("#currentDateTime");
current.innerHTML = datetime();

///
function ToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 73;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", ToFahrenheit);

function ToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 23;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", ToCelsius);

///
function displayWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "afce1346508a58faff468192f966498c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "afce1346508a58faff468192f966498c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);

  console.log(apiUrl);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#search-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Valencia");
