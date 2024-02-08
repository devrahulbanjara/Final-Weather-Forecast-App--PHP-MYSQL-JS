document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".fa-solid.fa-magnifying-glass");
  const cityInputField = document.querySelector(".weather__searchform");

  searchBtn.addEventListener("click", () => {
    fetchWeatherData(cityInputField.value.trim() || "Etawah");
  });

  document.querySelector(".title").addEventListener("click", () =>
    fetchWeatherData("Etawah")
  );

  cityInputField.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      fetchWeatherData(cityInputField.value.trim() || "Etawah");
    }
  });

  async function fetchWeatherData(city) {
    cityInputField.value = "";
    try {
      const storedData = JSON.parse(localStorage.getItem(city));

  
      if (storedData && isToday(storedData.current_weather.weather_date)) {
        updateCurrentWeatherUI(storedData.current_weather);
        console.log(`Shown ${city}'s data from local storage.`);
        updateHistoricalWeatherUI(storedData.historical_weather);

      } else {
        const response = await fetch(
          `http://localhost/old-weather-app/RahulDev_Banjara_2407061.php?city=${encodeURIComponent(
            city
          )}`
        );
        const data = await response.json();

        if (data.status === "success") {
          localStorage.setItem(city, JSON.stringify(data));
          const storedData = JSON.parse(localStorage.getItem(city));
          updateCurrentWeatherUI(storedData.current_weather);
          updateHistoricalWeatherUI(storedData.historical_weather);
          console.log(`Had to fetch from PHP to show ${city}'s data.`);
        } else {
          alert(`Error: ${data.message}`);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`An error occurred while fetching data for ${city}.`);
    }
  }

  function isToday(dateString) {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
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

    document.querySelector(".weather__icon img").src = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${icon}.png`;
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
