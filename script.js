document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("weather-form");
    const locationInput = document.getElementById("location-input");
    const weatherOutput = document.getElementById("weather-output");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const location = locationInput.value;

        if (!location) {
            weatherOutput.textContent = "Location not provided";
        } else {
            fetch('https://present-weatherapp.netlify.app/' + location)
                .then((response) => response.json())
                .then((data) => {
                    const message = `Temperature in ${data.location}: ${data.temperature}°C, ${data.conditions}`;
                    weatherOutput.textContent = message;
                })
                .catch((error) => {
                    console.error(error);
                    weatherOutput.textContent = "Error fetching weather data";
                });
        }
    });
});
