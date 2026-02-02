document.getElementById("searchBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "e0f99c494c2ce394a18cc2fd3f100543";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  if (!city) {
    document.getElementById("weatherInfo").innerHTML =
      "<p class='error'>Please enter a city name</p>";
    return;
  }

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch(() => {
      document.getElementById("weatherInfo").innerHTML =
        "<p class='error'>City not found. Try again.</p>";
    });
});

function displayWeather(data) {
  const temp = Math.round(data.main.temp - 273.15);
  const feelsLike = Math.round(data.main.feels_like - 273.15);
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const wind = data.wind.speed;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  document.getElementById("weatherInfo").innerHTML = `
    <div class="weather-card">
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
      <p class="temp">${temp}°C</p>
      <p class="desc">${description}</p>

      <div class="details">
        <div>
          <span>Feels Like</span>
          <strong>${feelsLike}°C</strong>
        </div>
        <div>
          <span>Humidity</span>
          <strong>${humidity}%</strong>
        </div>
        <div>
          <span>Wind</span>
          <strong>${wind} m/s</strong>
        </div>
        <div>
          <span>Pressure</span>
          <strong>${pressure} hPa</strong>
        </div>
      </div>
    </div>
  `;
}
