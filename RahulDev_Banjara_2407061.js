document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".fa-solid.fa-magnifying-glass");
  const cityInputField = document.querySelector(".weather__searchform");

  searchBtn.addEventListener("click", () => {
    fetchWeatherData(cityInputField.value.trim() || "Etawah");
  });

  document
    .querySelector(".title")
    .addEventListener("click", () => fetchWeatherData("Etawah"));

  cityInputField.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      fetchWeatherData(cityInputField.value.trim() || "Etawah");
    }
  });

  async function fetchWeatherData(city) {
    cityInputField.value = "";
    try {
      const storedData = JSON.parse(localStorage.getItem(city));

      if (
        storedData &&
        isToday(storedData.current_weather.weather_date) &&
        timediff(storedData.current_weather.data_stored_hour)
      ) {
        updateCurrentWeatherUI(storedData.current_weather);
        updateHistoricalWeatherUI(storedData.historical_weather);
        console.log(`Shown ${city}'s data from local storage.`);
      } else {
        const response = await fetch(
          `http://localhost/old-weather-app/RahulDev_Banjara_2407061.php?city=${city}`
        );
        const data = await response.json();

        if (data.status === "success") {
          const currentTime = new Date().getTime();
          data.current_weather.data_stored_hour = Math.floor(
            currentTime / (1000 * 60 * 60)
          ); // Store current hour
          localStorage.setItem(city, JSON.stringify(data));
          updateCurrentWeatherUI(data.current_weather);
          updateHistoricalWeatherUI(data.historical_weather);
          console.log(`Stored ${city}'s data in local storage from Database.`);
        } else {
          alert(`Error: ${data.message}`);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`An error occurred while fetching data for ${city}.`);
    }
  }

  function timediff(datainserthours) {
    const now = new Date();
    const currentHour = now.getHours();
    // console.log("Current hour: " + currentHour);
    if (currentHour - datainserthours < 2) {
      // console.log("True bhai true");
      return true;
    } else {
      // console.log("False bhai true");
      return false;
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
      country,
      humidity,
      wind,
      pressure,
      weather_date,
      icon,
    } = currentWeather;

    // Check if country property exists
    function convertCountryCode(country) {
      // Initialize Internationalization API for region names
      let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      return regionNames.of(country);
    }
    // This will log the country name or "Unknown" if country is null

    const roundedTemperature = Math.round(temperature);

    document.querySelector(
      ".weather__icon img"
    ).src = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${icon}.png`;
    document.querySelector(".weather__city").textContent = city_name;
    document.querySelector(".weather__country").textContent =
      convertCountryCode(country); // Display the country name

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
