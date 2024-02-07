document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".fa-solid.fa-magnifying-glass");
  const cityInputField = document.querySelector(".weather__searchform");

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
      const response = await fetch(
        `http://localhost/old-weather-app/main.php?city=${encodeURIComponent(
          city
        )}`
      );
      const data = await response.json();

      if (data.status === "success") {
        updateCurrentWeatherUI(data.current_weather);
        updateHistoricalWeatherUI(data.historical_weather);
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

    const weatherIcon = document.querySelector(".weather__icon img");
    if (weatherIcon) {
      weatherIcon.src = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${icon}.png`;
    } else {
      console.error("Weather icon element not found.");
    }

    document.querySelector(".weather__city").textContent = city_name;
    document.querySelector(
      ".weather__temperature"
    ).textContent = `${roundedTemperature}°`;
    document.querySelector(".weather__forecast").textContent = description;
    document.querySelector(".weather__wind").textContent = `Wind: ${wind} m/s`;
    document.querySelector(
      ".weather__pressure"
    ).textContent = `Pressure: ${pressure} hPa`;
    document.querySelector(
      ".weather__humidity"
    ).textContent = `Humidity: ${humidity}%`;
    document.querySelector(
      ".weather__date"
    ).textContent = `Date: ${weather_date}`;
  }

  function updateHistoricalWeatherUI(historicalWeather) {
    const pastWeatherDiv = document.querySelector(".weather-pastdata");
    pastWeatherDiv.innerHTML = "";

    historicalWeather.forEach((entry, index) => {
      if (index < 7) {
        const iconUrl = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${entry.icon}.png`;
        const weatherEntryDiv = document.createElement("div");
        weatherEntryDiv.classList.add("day");
        weatherEntryDiv.classList.add(`day${index + 1}`);
        weatherEntryDiv.innerHTML = `
          <div class="day-name">${entry.weather_date}</div>
          <div class="weather-icon"><img src="${iconUrl}" alt="Weather Icon"></div>
          <div class="temperature">${Math.round(entry.temperature)}°</div>
          <div class="weather-condition">${entry.description}</div>`;
        pastWeatherDiv.appendChild(weatherEntryDiv);
      }
    });
  }

  fetchWeatherData("Etawah");
});
