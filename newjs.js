// Name: Rahul Dev Banjara
// University ID: 2407061

document.addEventListener("DOMContentLoaded", ()=> {
  const submitBtn = document.getElementById("submit-btn");
  const cityInputField = document.getElementById("city-input-field");
  const tbody = document.querySelector(".weather-history-table tbody");

  submitBtn.addEventListener("click", () =>
    fetchWeatherData(cityInputField.value.trim() || "Etawah")
  );





  document.getElementById("theweather").addEventListener("click", () => fetchWeatherData("Etawah"));




  cityInputField.addEventListener("keyup",  (event)=> {
    if (event.key === "Enter") {
      fetchWeatherData(cityInputField.value.trim() || "Etawah");
    }
  });




  async function fetchWeatherData(city) {
    try {
      const apiUrl = `http://localhost/weatherapp/RahulDev_Banjara_2407061.php?city=${encodeURIComponent(city)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();



      




      if (data.status === "success") {


        
        
        updateCurrentWeatherUI(data.current_weather);
        updateHistoricalWeatherUI(data.historical_weather);
      } else if (data.message === "city not found") {
          alert("Invalid city name. Please enter a valid city.");
        } 
        else {
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
      timezone,
      humidity,
      wind,
      pressure,
      weather_date,
      icon,
      no_use,
    } = currentWeather;

    const roundedTemperature = Math.round(temperature);

    document.getElementById("city-header").textContent = city_name;
    document.getElementById(
      "weather-icon"
    ).src = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${icon}.png`;
    document.getElementById(
      "temperature"
    ).textContent = `${roundedTemperature}°`;
    document.getElementById("description").textContent = description;
    document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${wind} m/s`;
    document.getElementById(
      "pressure"
    ).textContent = `Pressure: ${pressure} hPa`;
    document.getElementById("datetime").textContent = `Date: ${weather_date}`;
  }

  function updateHistoricalWeatherUI(historicalWeather) {
    tbody.innerHTML = "";
    historicalWeather.forEach((entry) => {
      const iconUrl = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${entry.icon}.png`;
      const row = document.createElement("tr");
      row.innerHTML = `<td id="pasticon"><img src="${iconUrl}" alt="Weather Icon"></td><td>${Math.round(
        entry.temperature
      )}℃</td><td>${entry.description}</td><td>${entry.weather_date}</td>`;
      tbody.appendChild(row);
    });
  }

  fetchWeatherData("Etawah");
});
