<?php
$serverName = "sql105.infinityfree.com";
$userName   = "if0_41055790";
$password   = "xDz0d0nXxWGh";

$conn = mysqli_connect($serverName, $userName, $password);
if ($conn) {
    echo("Connection Successful <br>");
}else{
    echo("Failed to connect: " . mysqli_connect_error());
    }

// Create Database 
mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS if0_41055790_prototype3");
mysqli_select_db($conn, "if0_41055790_prototype3");

// Create Table
$createTable = "CREATE TABLE IF NOT EXISTS weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    humidity FLOAT NOT NULL,
    wind FLOAT NOT NULL,
    pressure FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$sql=mysqli_query($conn, $createTable);
if ($sql) {
    echo "table created successfully <br><br>";
} else {
    echo "Error creating table: <br><br> " . mysqli_error($conn);
}

//check if the from is submitted
if (isset($_POST['q'])) {
    $cityName = $_POST['q'];
    $humidity = $_POST['humidity'];
    $wind = $_POST['wind'];
    $pressure = $_POST['pressure'];

    // Insert data
    $sql = "INSERT INTO weather (city, humidity, wind, pressure) 
            VALUES ('$cityName', $humidity, $wind, $pressure)";

    if (mysqli_query($conn, $sql)) {
        echo "Data inserted successfully <br>";
    } else {
        echo "Error inserting data <br>" . mysqli_error($conn);
    }
  // Fetch data safely AFTER cityName exists
$selectAllData = "SELECT * FROM weather 
                  WHERE city = '$cityName' 
                  AND created_at >= NOW() - INTERVAL 2 HOUR";

$result = mysqli_query($conn, $selectAllData);

$rows = [];
while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
}
}
// Close connection
?><br><br>
<a href="index.html">Go Back To Home</a>    