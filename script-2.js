const apiKey = "bf7024cfe11d5ed7d5dd14de52dc37fa";

function getWeatherIconClass(weatherMain) {
    switch(weatherMain.toLowerCase()) {
        case "clear": return "fa-solid fa-sun";
        case "clouds": return "fa-solid fa-cloud";
        case "rain": return "fa-solid fa-cloud-showers-heavy";
        case "drizzle": return "fa-solid fa-cloud-rain";
        case "thunderstorm": return "fa-solid fa-bolt";
        case "snow": return "fa-solid fa-snowflake";
        case "mist":
        case "fog":
        case "haze":
        case "smoke": return "fa-solid fa-smog";
        default: return "fa-solid fa-cloud";
    }
}

async function fetchWeatherData(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const visibilityKm = data.visibility / 1000;

 

        if (data.cod === "404" || data.cod === 404) {
            document.getElementById("myParagraph").innerHTML = "City not found";
            return;
        }

        //  SAVE SEARCHED Weather TO PHP SERVER
        fetch("connection.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `q=${city}&humidity=${data.main.humidity}&wind=${data.wind.speed}&pressure=${data.main.pressure}`
        });

        const iconClass = getWeatherIconClass(data.weather[0].main);

        document.getElementById("myParagraph").innerHTML = `
            <i class="${iconClass} fa-4x"></i>
            <h2>Weather in ${data.name}</h2>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Visibility: ${visibilityKm} km</p>
        `;

    } catch (err) {
        console.log(err);
        document.getElementById("myParagraph").innerHTML = "Error fetching data";
    }
}

document.getElementById("searchButton").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (city !== "") {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name");
    }
});

fetchWeatherData("Middlesbrough");
