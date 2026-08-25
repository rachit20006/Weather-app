async function fetchWeatherData(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === "404" || data.cod === 404) {
            document.getElementById("myParagraph").innerHTML = "City not found";
            return;
        }

        // SAVE the data to localStorage .
        localStorage.setItem(city.toLowerCase(), JSON.stringify(data));

        const visibilityKm = data.visibility / 1000;
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
        // 🔴 FETCH FAILED → LOAD FROM localStorage
        const cachedData = localStorage.getItem(city.toLowerCase());

        if (cachedData) {
            const data = JSON.parse(cachedData);
            const visibilityKm = data.visibility / 1000;
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
        } else {
            document.getElementById("myParagraph").innerHTML =
                "No offline data available for this city.";
        }
    }
}