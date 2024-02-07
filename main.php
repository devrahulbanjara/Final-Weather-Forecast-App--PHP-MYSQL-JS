
<?php

header("Access-Control-Allow-Origin: https://errors.infinityfree.net");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
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

function getCurrentTimestampInHours()
{
    return date("H") + 4;
}

function getWeatherDataFromDatabase($conn, $city)
{
    $today = date("Y-m-d");
    $existingQuery = "SELECT * FROM weather_details WHERE city_name='$city' AND DATE(weather_date) = '$today' ORDER BY weather_date DESC LIMIT 1";
    $result = $conn->query($existingQuery);

    return ($result && $result->num_rows > 0) ? $result->fetch_assoc() : false;
}

function getHistoricalWeatherData($conn, $city)
{
    $historyQuery = "SELECT * FROM weather_details WHERE city_name='$city' ORDER BY weather_date DESC LIMIT 7";
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
    $todate = date("Y-m-d", $apiData["dt"]);
    $updateQuery = "UPDATE weather_details SET 
                temperature='{$apiData["main"]["temp"]}', 
                description='{$apiData["weather"][0]["description"]}', 
                timezone='{$apiData["timezone"]}', 
                humidity='{$apiData["main"]["humidity"]}', 
                wind='{$apiData["wind"]["speed"]}', 
                pressure='{$apiData["main"]["pressure"]}', 
                icon='{$apiData["weather"][0]["icon"]}',
                data_stored_hour='{$currentHourInNepal}'
                WHERE city_name='$city' AND weather_date='$todate'";
    $conn->query($updateQuery);
}

function insertDataIntoDatabase($conn, $city, $apiData, $currentHourInNepal)
{
    $today = date("Y-m-d", $apiData["dt"]);
    $insertQuery = "INSERT INTO weather_details (city_name, temperature, description, timezone, humidity, wind, pressure, icon, weather_date, data_stored_hour)
                    VALUES ('$city', '{$apiData["main"]["temp"]}', '{$apiData["weather"][0]["description"]}', '{$apiData["timezone"]}', '{$apiData["main"]["humidity"]}', '{$apiData["wind"]["speed"]}', '{$apiData["main"]["pressure"]}', '{$apiData["weather"][0]["icon"]}', '$today', '{$currentHourInNepal}')";
    $conn->query($insertQuery);
}

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["city"])) {
    $city = $_GET["city"];

    $conn = new mysqli("localhost", "root", "", "weather");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $currentHourInNepal = getCurrentTimestampInHours();

    $existingWeatherData = getWeatherDataFromDatabase($conn, $city);


//check if city exists in the database
    if ($existingWeatherData) {
        $dataInsertHour = $existingWeatherData["data_stored_hour"];
        $hourDifference = $currentHourInNepal - $dataInsertHour;



//if exists in the database , check if the data is one hour or less old , display directly
        if ($hourDifference <= 1) {
            $historyData = getHistoricalWeatherData($conn, $city);

            $response_data = [
                "status" => "success",
                "current_weather" => [
                    "city_name" => $existingWeatherData["city_name"],
                    "temperature" => $existingWeatherData["temperature"],
                    "description" => $existingWeatherData["description"],
                    "timezone" => $existingWeatherData["timezone"],
                    "humidity" => $existingWeatherData["humidity"],
                    "wind" => $existingWeatherData["wind"],
                    "pressure" => $existingWeatherData["pressure"],
                    "weather_date" => $existingWeatherData["weather_date"],
                    "icon" => $existingWeatherData["icon"],
                    "data_stored_hour" => $existingWeatherData["data_stored_hour"]
                ],
                "historical_weather" => $historyData
            ];

 //if the data is more than 1 hour old fetch from openweatherapi and store in DB and display it           
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
                            "timezone" => $storedData["timezone"],
                            "humidity" => $storedData["humidity"],
                            "wind" => $storedData["wind"],
                            "pressure" => $storedData["pressure"],
                            "weather_date" => $storedData["weather_date"],
                            "icon" => $storedData["icon"],
                            "data_stored_hour" => $storedData["data_stored_hour"]
                        ],
                        "historical_weather" => $historyData
                    ];
                } else {
                    $response_data = ["status" => "error", "message" => "Failed to retrieve stored data from the database"];
                }
            }

        }


//the city doesnt exist in the database , add from openweatherapi to database and display it
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
                        "timezone" => $storedData["timezone"],
                        "humidity" => $storedData["humidity"],
                        "wind" => $storedData["wind"],
                        "pressure" => $storedData["pressure"],
                        "weather_date" => $storedData["weather_date"],
                        "icon" => $storedData["icon"],
                        "data_stored_hour" => $storedData["data_stored_hour"]
                    ],
                    "historical_weather" => $historyData
                ];
            } else {
                $response_data = ["status" => "error", "message" => "Failed to retrieve stored data from the database"];
            }
        } else {
            $response_data = ["status" => "error", "message" => "Failed to fetch data from API. No data available in the database."];
        }
    }

    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($response_data);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

?>