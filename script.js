document.getElementById("searchBtn").addEventListener("click", function() {
    var city = document.getElementById("cityInput").value;
    var apiKey = "e0f99c494c2ce394a18cc2fd3f100543";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.log("Error fetching weather data:", error);
        document.getElementById("weatherInfo").innerHTML = "City not found";
    });
});

function displayWeather(data) {
    var cityName = data.name;
    var temp = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
    var weatherDescription = data.weather[0].description;

    var weatherInfo = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Description: ${weatherDescription}</p>
    `;

    document.getElementById("weatherInfo").innerHTML = weatherInfo;
}
