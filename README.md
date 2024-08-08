# Weather Application

A responsive weather application that combines HTML, CSS, JavaScript, PHP, and MySQL to deliver a dynamic and efficient weather experience. This application utilizes the OpenWeatherMap API to fetch weather data, which is then stored in a MySQL database for faster subsequent access.

## Features

- **Responsive Design:** Accessible on various devices, ensuring a consistent user experience.
- **Real-time Weather Data:** Fetches the latest weather information using the OpenWeatherMap API.
- **Data Caching:** Utilizes browser storage to cache data, providing quick access during subsequent visits.
- **Database Integration:** Stores weather data in a MySQL database, reducing the need for repeated API calls and enhancing performance.
- **API Integration:** Automatically fetches and updates weather data from the OpenWeatherMap API when not available in browser storage or the database.

## How It Works

1. **User Access:** When a user visits the application, it first checks for cached data in the browser storage.
2. **Database Query:** If cached data is not found, the application queries the MySQL database for the required weather information.
3. **API Request:** If the data is also not available in the database, the application fetches the data from the OpenWeatherMap API.
4. **Data Storage:** The fetched data is stored in both the MySQL database and the browser storage for future use.
5. **Data Display:** The application displays the weather data to the user, ensuring that they receive up-to-date information.

## Technologies Used

- **Front-End:** HTML, CSS, JavaScript
- **Back-End:** PHP, MySQL
- **API:** OpenWeatherMap

## Installation

To set up this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/weather-application.git
    ```
2. Set up your MySQL database and import the provided SQL file.
3. Configure the database connection in the PHP files.
4. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/) and add it to the relevant JavaScript or PHP files.
5. Deploy the application on a local or web server.

## Usage

1. Open the application in your browser.
2. Enter the desired location to fetch weather data.
3. View the weather information, which is fetched and displayed based on the location.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your proposed changes.

## Demo

Check out the live demo [here](https://devrahulbanjara.serv00.net/).
