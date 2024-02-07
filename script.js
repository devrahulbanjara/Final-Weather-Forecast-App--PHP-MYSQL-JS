document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".fa-solid.fa-magnifying-glass");
  const cityInputField = document.querySelector(".weather__searchform input");
  const pastWeatherDiv = document.querySelector(".weather-pastdata");

  searchBtn.addEventListener("click", () =>
    fetchWeatherData(cityInputField.value.trim() || "Etawah")
  );

  cityInputField.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      fetchWeatherData(cityInputField.value.trim() || "Etawah");
    }
  });

  async function fetchWeatherData(city) {
    try {
      const apiUrl = `http://localhost/weatherapp/RahulDev_Banjara_2407061.php?city=${city}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "success") {
        updateCurrentWeatherUI(data.current_weather);
        updateHistoricalWeatherUI(data.historical_weather);
      } else if (data.message === "city not found") {
        alert("Invalid city name. Please enter a valid city.");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`An error occurred while fetching data for ${city}.`);
    }
  }

  function updateCurrentWeatherUI(currentWeather) {
    const {
      city_name,
      temperature,
      description,
      humidity,
      wind,
      pressure,
      weather_date,
      icon,
    } = currentWeather;

    const roundedTemperature = Math.round(temperature);

    document.querySelector(".weather__city").textContent = city_name;
    document.querySelector(".weather__temperature").textContent = `${roundedTemperature}°`;
    document.querySelector(".weather__forecast").textContent = description;
    document.querySelector(".weather__wind").textContent = `Wind: ${wind} m/s`;
    document.querySelector(".weather__pressure").textContent = `Pressure: ${pressure} hPa`;
    document.querySelector(".weather__humidity").textContent = `Humidity: ${humidity}%`;
    document.querySelector(".weather__date").textContent = `Date: ${weather_date}`;
    document.querySelector(".weather__icon img").src = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${icon}.png`;
  }

  function updateHistoricalWeatherUI(historicalWeather) {
    pastWeatherDiv.innerHTML = ""; // Clear existing data
    historicalWeather.forEach((entry) => {
      const iconUrl = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${entry.icon}.png`;
      const day = entry.weather_date.split(',')[0]; // Extracting only the day from the full date
      const weatherEntryDiv = document.createElement("div");
      weatherEntryDiv.classList.add("day");
      weatherEntryDiv.innerHTML = `
        <div class="day-name">${day}</div>
        <div class="weather-icon"><img src="${iconUrl}" alt="Weather Icon"></div>
        <div class="temperature">${Math.round(entry.temperature)}°</div>
        <div class="weather-condition">${entry.description}</div>`;
      pastWeatherDiv.appendChild(weatherEntryDiv); // Append each weather entry to the past weather div
    });
  }

  fetchWeatherData("Etawah");
});
