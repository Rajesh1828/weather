document.addEventListener("DOMContentLoaded", () => {
    const weatherForm = document.querySelector(".weather-form");
    const cityInput = document.querySelector(".cityInput");
    const card = document.querySelector(".card");
    const apiKey = "8d6cb5b983541c4d37a6b0c9ae601e08";

    if (weatherForm) {
        weatherForm.addEventListener("submit", async event => {
            event.preventDefault();

            const city = cityInput.value.trim(); // Trim whitespace from city input

            if (city) {
                try {
                    const weatherData = await getWeatherData(city);
                    displayWeatherInfo(weatherData);
                } catch (error) {
                    console.error("Error in main event listener:", error);
                    displayError("Could not fetch weather data. Please try again.");
                }
            } else {
                displayError("Please enter a valid city name.");
            }
        });
    } else {
        console.error("weatherForm element not found");
    }

    async function getWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        try {
            const response = await fetch(apiUrl);
            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error("Could not fetch weather data");
            }

            const data = await response.json();
            console.log("Weather data:", data);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    function getWeatherEmoji(weather) {
        const condition = weather[0].main.toLowerCase();
        switch (condition) {
            case 'clear':
                return '☀️'; 
            case 'clouds':
                return '☁️'; 
            case 'rain':
                return '🌧️'; 
            case 'snow':
                return '❄️';
            case 'thunderstorm':
                return '⛈️';
            case 'drizzle':
                return '🌦️';
            case 'mist':
            case 'fog':
                return '🌫️'; 
            default:
                return '🌈'; 
        }
    }

    function displayWeatherInfo(data) {
        const { name: city, main: { temp, humidity }, weather: [{ description }] } = data;

        card.textContent = "";
        card.style.display = "flex"; /*  -------------Show the card*/

        const cityName = document.createElement("h2");
        cityName.textContent = `Weather in ${city}`;

        const tempDisplay = document.createElement("p");
        tempDisplay.classList.add("tempDisplay");
        tempDisplay.textContent = `Temperature: ${temp}°C`;

        const humidityDisplay = document.createElement("p");
        humidityDisplay.classList.add("humidityDisplay");
        humidityDisplay.textContent = `Humidity: ${humidity}%`;

        const descriptionDisplay = document.createElement("p");
        descriptionDisplay.classList.add("decDisplay");
        descriptionDisplay.textContent = `Description: ${description}`;

        const emoji = getWeatherEmoji(data.weather);
        const emojiDisplay = document.createElement("p");
        emojiDisplay.classList.add("whetherEmoji");
        emojiDisplay.textContent = emoji; //>.......................>>>>>>>>>>>>>>>>>>>>>>>>>.. Add emoji to the display

        card.appendChild(cityName);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descriptionDisplay);
        card.appendChild(emojiDisplay); // Append emoji to the card
    }

    function displayError(message) {
        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("errorDisplay");

        card.textContent = ""; // Clear previous content
        card.style.display = "flex"; // Show the card
        card.appendChild(errorDisplay); // Append error message
    }
});
  