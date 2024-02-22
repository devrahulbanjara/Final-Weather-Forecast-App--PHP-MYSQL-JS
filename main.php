<?php

function fetchWeatherDataFromAPI($city)
{
    $apiKey = "145c5f5cc7b6719079c76a215871e298";
    $apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey&units=metric";

    $response = file_get_contents($apiUrl);

    if ($response !== false) {
        $data = json_decode($response, true);
        return (isset($data["cod"]) && $data["cod"] == 200) ? $data : false;
    }

    return false;
}

//gets UTC time and adjusts it to kathmandu's time
function getCurrentTimestampInHours()
{
    $current_utc_time = gmdate("H:i");
    $kathmandu_time_difference = 5.75;
    $kathmandu_time = strtotime($current_utc_time) + ($kathmandu_time_difference * 3600);
    return date("H", $kathmandu_time);
}


function getWeatherDataFromDatabase($conn, $city)
{
    date_default_timezone_set('Asia/Kathmandu');
    $todayString = new DateTime();
    $today = $todayString->format('Y-m-d');
    //query to return a row of today's date
    $existingQuery = "SELECT * FROM weather_details WHERE city_name='$city' AND DATE(weather_date) = '$today' ORDER BY weather_date DESC LIMIT 1";
    $result = $conn->query($existingQuery);
    return ($result && $result->num_rows > 0) ? $result->fetch_assoc() : false;
}

function getHistoricalWeatherData($conn, $city)
{
    $today = date("Y-m-d");
    //return latest dates first and it must be less than today's date
    $historyQuery = "SELECT * FROM weather_details WHERE city_name='$city' AND weather_date < '$today' ORDER BY weather_date DESC LIMIT 7";
    $historyResult = $conn->query($historyQuery);
    $historyData = [];
    while ($historyRow = $historyResult->fetch_assoc()) {
        $entry = [
            "icon" => $historyRow["icon"],
            "description" => $historyRow["description"],
            "temperature" => $historyRow["temperature"],
            "weather_date" => $historyRow["weather_date"]
        ];
        $historyData[] = $entry;
    }
    return $historyData;
}

function updateDatabaseWithAPIData($conn, $city, $apiData, $currentHourInNepal)
{
    date_default_timezone_set('Asia/Kathmandu');
    $todayString = new DateTime();
    $todate = $todayString->format('Y-m-d');
    //updates the row with latest data
    $country = $apiData["sys"]["country"];
    $updateQuery = "UPDATE weather_details SET
                temperature='{$apiData["main"]["temp"]}',
                description='{$apiData["weather"][0]["description"]}',
                timezone='{$apiData["timezone"]}',
                humidity='{$apiData["main"]["humidity"]}',
                wind='{$apiData["wind"]["speed"]}',
                pressure='{$apiData["main"]["pressure"]}',
                icon='{$apiData["weather"][0]["icon"]}',
                data_stored_hour='{$currentHourInNepal}',
                country= '{$country}'
                WHERE city_name='$city' AND weather_date='$todate'";
    $conn->query($updateQuery);
}

function insertDataIntoDatabase($conn, $city, $apiData, $currentHourInNepal)
{
    date_default_timezone_set('Asia/Kathmandu');
    $todayString = new DateTime();
    $today = $todayString->format('Y-m-d');


    $country = $apiData["sys"]["country"];
    $insertQuery = "INSERT INTO weather_details (city_name, temperature, description, timezone, humidity, wind, pressure, icon, weather_date, data_stored_hour, country)
                    VALUES ('$city', '{$apiData["main"]["temp"]}', '{$apiData["weather"][0]["description"]}', '{$apiData["timezone"]}', '{$apiData["main"]["humidity"]}', '{$apiData["wind"]["speed"]}', '{$apiData["main"]["pressure"]}', '{$apiData["weather"][0]["icon"]}', '$today', '{$currentHourInNepal}', '{$country}')";
    $conn->query($insertQuery);
}




//default request method = get
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["city"])) {
    $city = $_GET["city"];

    $conn = new mysqli("mysql2.serv00.com", "m3001_devrahul", "Apple@12", "m3001_weather");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $currentHourInNepal = getCurrentTimestampInHours();
    $existingWeatherData = getWeatherDataFromDatabase($conn, $city);

    //check if city exists in the database
    if ($existingWeatherData) {
        $dataInsertHour = $existingWeatherData["data_stored_hour"];
        $hourDifference = $currentHourInNepal - $dataInsertHour;

        //if exists in the database , check if the data is three hour or less old , display directly
        if ($hourDifference <= 3) {
            $historyData = getHistoricalWeatherData($conn, $city);

            $response_data = [
                "status" => "success",
                "current_weather" => [
                    "city_name" => $existingWeatherData["city_name"],
                    "temperature" => $existingWeatherData["temperature"],
                    "description" => $existingWeatherData["description"],
                    "data_stored_hour" => $existingWeatherData["data_stored_hour"],
                    "humidity" => $existingWeatherData["humidity"],
                    "wind" => $existingWeatherData["wind"],
                    "pressure" => $existingWeatherData["pressure"],
                    "weather_date" => $existingWeatherData["weather_date"],
                    "icon" => $existingWeatherData["icon"],
                    "country" => $existingWeatherData["country"],
                ],
                "historical_weather" => $historyData
            ];

            //if the data is more than 3 hour old fetch from openweatherapi and store in DB and display it           
        } else {
            $apiData = fetchWeatherDataFromAPI($city);
            if ($apiData) {
                updateDatabaseWithAPIData($conn, $city, $apiData, $currentHourInNepal);
                $storedData = getWeatherDataFromDatabase($conn, $city);
                $historyData = getHistoricalWeatherData($conn, $city);

                if ($storedData) {
                    $response_data = [
                        "status" => "success",
                        "current_weather" => [
                            "city_name" => $storedData["city_name"],
                            "temperature" => $storedData["temperature"],
                            "description" => $storedData["description"],
                            "data_stored_hour" => $storedData["data_stored_hour"], // Corrected line
                            "humidity" => $storedData["humidity"],
                            "wind" => $storedData["wind"],
                            "pressure" => $storedData["pressure"],
                            "weather_date" => $storedData["weather_date"],
                            "icon" => $storedData["icon"],
                            "country" => $storedData["country"],
                        ],
                        "historical_weather" => $historyData
                    ];
                } else {
                    //database failed to give data
                    $response_data = ["status" => "error", "message" => "Failed to retrieve stored data from the database"];
                }
            }
        }
        //the city doesn't exist in the database, add from openweatherapi to database and display it
    } else {
        $apiData = fetchWeatherDataFromAPI($city);
        if ($apiData) {
            insertDataIntoDatabase($conn, $city, $apiData, $currentHourInNepal);
            $storedData = getWeatherDataFromDatabase($conn, $city);
            $historyData = getHistoricalWeatherData($conn, $city);

            if ($storedData) {
                $response_data = [
                    "status" => "success",
                    "current_weather" => [
                        "city_name" => $storedData["city_name"],
                        "temperature" => $storedData["temperature"],
                        "description" => $storedData["description"],
                        "data_stored_hour" => $storedData["data_stored_hour"],
                        "humidity" => $storedData["humidity"],
                        "wind" => $storedData["wind"],
                        "pressure" => $storedData["pressure"],
                        "weather_date" => $storedData["weather_date"],
                        "icon" => $storedData["icon"],
                        "country" => $storedData["country"],
                    ],
                    "historical_weather" => $historyData
                ];
                //database failed to give data
            } else {
                $response_data = ["status" => "error", "message" => "Failed to retrieve stored data from the database"];
            }
            //api failes to respond
        } else {
            $response_data = ["status" => "error", "message" => "Failed to fetch data from API. No data available in the database."];
        }
    }

    $conn->close();
    header('Content-Type: application/json');
    echo json_encode($response_data);
    //no city name given from JS
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

?>