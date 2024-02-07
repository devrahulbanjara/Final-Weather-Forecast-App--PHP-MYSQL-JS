/* Student Name: Rahul Dev Banjara
   Student I.D: 2407061*/

   const apiKey = "145c5f5cc7b6719079c76a215871e298";
   const apiUrl =
     "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
   
   // Event listener for DOMContentLoaded to trigger weather check for the default city
   document.addEventListener("DOMContentLoaded", () => {
     const defaultCity = "Etawah";
     checkWeather(defaultCity);
   });
   


   function convertCountryCode(country) {
     // Initialize Internationalization API for region names
     let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
     return regionNames.of(country);
   }
   
   
   // DOM elements
   const searchForm = document.querySelector(".weather__searchform");
   const searchBtn = document.querySelector(".fa-magnifying-glass");
   const weatherIconElement = document.querySelector(".weather__icon");
   const weatherCityElement = document.querySelector(".weather__city");
   const countryElement = document.querySelector(".country");
   const temperatureElement = document.querySelector(".weather__temperature");
   const forecastElement = document.querySelector(".weather__forecast");
   const realFeelElement = document.querySelector(".weather__realfeel");
   const pressureElement = document.querySelector(".weather__pressure");
   const windElement = document.querySelector(".weather__wind");
   const humidityElement = document.querySelector(".weather__humidity");
   const dateElement = document.querySelector(".weather__date");
   const timeElement = document.querySelector(".weather__time");
   
   
   
   //function for icon
   function setWeatherIcon(iconCode) {
     const iconBaseUrl =
       "https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/";
   
     const iconUrl = iconBaseUrl + `${iconCode}.png`;
     return `<img src="${iconUrl}" />`;
   }
   
   
   
   // Asunc function to check weather
   async function checkWeather(city) {
     try {
       const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
       const data = await response.json();
   
       console.log(data);
       if (data.cod && data.cod == 404) {
         alert("City Not found");
         return;
       }
   
   
       //date day year
       let unixTimestamp = data.dt;
       // Create a new Date object and multiply the timestamp by 1000
       let date = new Date(unixTimestamp * 1000);
       // Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
       let dayOfWeek = date.getDay();
       let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
       let formattedDate = date.toLocaleDateString();
       console.log(formattedDate)
       let dateComponents = formattedDate.split("/");
       let weekday = daysOfWeek[dayOfWeek];
       const allmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
       let month = allmonths[dateComponents[0] - 1];
   
   
       //time
       let timestampOffset = data.timezone;
       const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
       const da = new Date(timestamp * 1000);
       const localTime = da.toLocaleString("en-US", {
         hour: "numeric",
         minute: "numeric",
         second: "numeric",
         timeZone: "UTC",
       });
       console.log(localTime);
   
   
   
       // Replacing to webpage
       weatherIconElement.innerHTML = setWeatherIcon(data.weather[0].icon);
       weatherCityElement.innerHTML = data.name;
       countryElement.innerHTML = convertCountryCode(data.sys.country);
       temperatureElement.innerHTML = `${Math.round(data.main.temp)}°`;
       forecastElement.innerHTML = data.weather[0].description;
       realFeelElement.innerHTML = `${Math.round(data.main.feels_like)}°`;
       pressureElement.innerHTML = `${parseInt(data.main.pressure)}mb`;
       windElement.innerHTML = `${data.wind.speed}m/s`;
       humidityElement.innerHTML = `${parseInt(data.main.humidity)}%`;
       dateElement.innerHTML = `${weekday},   ${dateComponents[1]} ${month},${dateComponents[2]}`;
       timeElement.innerHTML = localTime;
   
       // any error except invalid name
     } catch (error) {
       alert("An error occurred. Please try again later.");
     }
   }
   
   // Event listener for search button click
   searchBtn.addEventListener("click", () => {
     // Trigger weather check for the entered city
     
     checkWeather(searchForm.value);
     // Clear the search input field
     searchForm.value = "";
   });
   
   // Event listener for enter
   searchForm.addEventListener("keyup", (e) => {
     // console.log(e.key)
     if (e.key === "Enter") {
       checkWeather(searchForm.value);
     }
   });
   