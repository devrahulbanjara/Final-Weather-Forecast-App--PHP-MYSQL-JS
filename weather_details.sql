-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql2.serv00.com
-- Generation Time: Sep 20, 2024 at 04:17 PM
-- Server version: 8.0.39
-- PHP Version: 8.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `m3001_weather`
--

-- --------------------------------------------------------

--
-- Table structure for table `weather_details`
--

CREATE TABLE `weather_details` (
  `Id` int NOT NULL,
  `city_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `temperature` decimal(5,2) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `timezone` int DEFAULT NULL,
  `humidity` int NOT NULL,
  `wind` decimal(5,2) NOT NULL,
  `pressure` int DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `weather_date` date NOT NULL,
  `data_stored_hour` int DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weather_details`
--

INSERT INTO `weather_details` (`Id`, `city_name`, `temperature`, `description`, `timezone`, `humidity`, `wind`, `pressure`, `icon`, `weather_date`, `data_stored_hour`, `country`) VALUES
(1, 'Etawah', 19.00, 'clear sky', 19800, 59, 0.79, 1017, '01n', '2024-01-30', 2, 'IN'),
(2, 'Etawah', 22.00, 'clear sky', 19800, 59, 0.79, 1012, '01d', '2024-01-31', 3, 'IN'),
(3, 'Etāwah', 23.00, 'few clouds', 19800, 59, 0.79, 1017, '02d', '2024-02-01', 7, 'IN'),
(4, 'Etawah', 21.00, 'clear sky', 19800, 48, 4.45, 1012, '01n', '2024-02-02', 13, 'IN'),
(5, 'Etawah', 28.00, 'broken clouds', 19800, 45, 4.45, 1014, '04d', '2024-02-03', 12, 'IN'),
(6, 'Etawah', 23.00, 'clear sky', 19800, 47, 4.45, 1015, '01d', '2024-02-04', 1, 'IN'),
(7, 'Etawah', 20.00, 'broken clouds', 19800, 49, 4.45, 1018, '04d', '2024-02-05', 18, 'IN'),
(8, 'Etawah', 21.00, 'broken clouds', 19800, 42, 4.45, 1019, '04d', '2024-02-06', 12, 'IN'),
(10, 'Etawah', 19.33, 'overcast clouds', 19800, 33, 4.08, 1021, '04d', '2024-02-07', 11, 'IN'),
(20, 'Etawah', 13.00, 'scattered clouds', 19800, 35, 3.78, 1018, '03n', '2024-02-08', 20, 'IN'),
(29, 'Etawah', 21.99, 'clear sky', 19800, 21, 2.20, 1019, '01d', '2024-02-09', 13, 'IN'),
(45, 'Etawah', 20.00, 'clear sky', 19800, 39, 0.98, 1023, '01d', '2024-02-10', 7, 'IN'),
(52, 'Etawah', 15.22, 'clear sky', 19800, 37, 1.28, 1020, '01n', '2024-02-11', 21, 'IN'),
(61, 'Etawah', 19.08, 'scattered clouds', 19800, 32, 1.64, 1022, '03d', '2024-02-12', 9, 'IN'),
(63, 'kathmandu', 16.12, 'haze', 20700, 48, 1.54, 1026, '50d', '2024-02-12', 11, 'NP'),
(64, 'Etawah', 18.51, 'broken clouds', 19800, 51, 2.97, 1017, '04n', '2024-02-13', 20, 'IN'),
(65, 'Kathmandu', 14.12, 'broken clouds', 20700, 47, 2.57, 1023, '04n', '2024-02-13', 20, 'NP'),
(66, 'washington', 3.28, 'scattered clouds', -28800, 77, 1.63, 1020, '03n', '2024-02-13', 9, 'US'),
(67, 'Dhangadhi', 23.43, 'overcast clouds', 20700, 19, 0.71, 1020, '04d', '2024-02-13', 10, 'NP'),
(68, 'Nepalgunj', 26.48, 'overcast clouds', 20700, 20, 1.77, 1015, '04d', '2024-02-13', 16, 'NP'),
(69, 'simara', 17.25, 'overcast clouds', 20700, 32, 2.08, 1017, '04n', '2024-02-13', 23, 'NP'),
(70, 'ilam', 11.93, 'few clouds', 20700, 39, 2.80, 1020, '02n', '2024-02-13', 23, 'NP'),
(71, 'biratnagar', 17.51, 'scattered clouds', 20700, 40, 1.74, 1017, '03n', '2024-02-13', 23, 'NP'),
(72, 'Etawah', 22.36, 'few clouds', 19800, 41, 3.03, 1015, '02d', '2024-02-14', 17, 'IN'),
(73, 'simara', 19.53, 'overcast clouds', 20700, 30, 1.38, 1020, '04d', '2024-02-14', 9, 'NP'),
(74, 'kathmandu', 11.12, 'mist', 20700, 71, 2.06, 1024, '50d', '2024-02-14', 9, 'NP'),
(75, 'wolverhampton', 10.40, 'overcast clouds', 0, 96, 1.34, 1007, '04n', '2024-02-14', 9, 'GB'),
(76, 'Etawah', 17.97, 'clear sky', 19800, 34, 2.00, 1018, '01n', '2024-02-15', 20, 'IN'),
(77, 'kathmandu', 20.12, 'few clouds', 20700, 34, 4.63, 1021, '02d', '2024-02-15', 15, 'NP'),
(78, 'Etawah', 18.20, 'clear sky', 19800, 30, 2.21, 1018, '01n', '2024-02-16', 21, 'IN'),
(79, 'kathmandu', 14.12, 'few clouds', 20700, 77, 2.57, 1021, '02n', '2024-02-16', 21, 'NP'),
(80, 'goa', 23.15, 'clear sky', 19800, 75, 1.08, 1014, '01n', '2024-02-16', 21, 'IN'),
(81, 'simara', 17.12, 'clear sky', 20700, 51, 1.97, 1017, '01n', '2024-02-16', 21, 'NP'),
(82, 'biratnagar', 18.29, 'clear sky', 20700, 44, 3.31, 1016, '01n', '2024-02-16', 21, 'NP'),
(83, 'London', 12.60, 'broken clouds', 0, 74, 6.17, 1017, '04d', '2024-02-16', 21, 'GB'),
(85, 'Etawah', 23.62, 'clear sky', 19800, 26, 2.30, 1011, '01d', '2024-02-17', 17, 'IN'),
(86, 'Etawah', 23.69, 'broken clouds', 19800, 23, 2.38, 1014, '04d', '2024-02-18', 11, 'IN'),
(87, 'simara', 24.85, 'clear sky', 20700, 17, 3.15, 1015, '01d', '2024-02-18', 11, 'NP'),
(88, 'biratnagar', 25.55, 'few clouds', 20700, 21, 3.22, 1015, '02d', '2024-02-18', 11, 'NP'),
(89, 'ilam', 18.87, 'scattered clouds', 20700, 41, 3.34, 1016, '03d', '2024-02-18', 11, 'NP'),
(90, 'Etawah', 23.81, 'clear sky', 19800, 28, 4.90, 1015, '01d', '2024-02-19', 10, 'IN'),
(91, 'Etawah', 32.17, 'few clouds', 19800, 24, 6.58, 1008, '02d', '2024-02-20', 15, 'IN'),
(92, 'Etawah', 25.54, 'overcast clouds', 19800, 30, 5.33, 1010, '04d', '2024-02-21', 13, 'IN'),
(93, 'Kathmandu', 13.12, 'mist', 20700, 71, 2.06, 1016, '50d', '2024-02-21', 9, 'NP'),
(94, 'Etawah', 20.73, 'clear sky', 19800, 41, 2.50, 1014, '01d', '2024-02-22', 9, 'IN'),
(95, 'kathmandu', 19.12, 'scattered clouds', 20700, 34, 4.63, 1016, '03d', '2024-02-22', 12, 'NP'),
(96, 'delhi', 21.73, 'haze', 19800, 43, 2.57, 1015, '50d', '2024-02-22', 12, 'IN'),
(97, 'Etawah', 26.32, 'overcast clouds', 19800, 14, 3.11, 1013, '04d', '2024-02-24', 15, 'IN'),
(98, 'Etawah', 18.68, 'broken clouds', 19800, 26, 2.81, 1017, '04n', '2024-02-25', 20, 'IN'),
(99, 'Etawah', 23.95, 'overcast clouds', 19800, 23, 0.45, 1015, '04d', '2024-02-26', 17, 'IN'),
(100, 'Etawah', 22.49, 'scattered clouds', 19800, 22, 2.86, 1019, '03d', '2024-02-27', 9, 'IN'),
(101, 'Etawah', 28.24, 'clear sky', 19800, 17, 6.10, 1011, '01d', '2024-02-28', 17, 'IN'),
(102, 'Etawah', 24.74, 'few clouds', 19800, 17, 4.25, 1013, '02d', '2024-03-05', 16, 'IN'),
(103, 'Etawah', 31.57, 'scattered clouds', 19800, 8, 2.54, 1013, '03d', '2024-03-17', 14, 'IN'),
(104, 'Etawah', 20.94, 'clear sky', 19800, 18, 1.47, 1014, '01d', '2024-03-20', 7, 'IN'),
(105, 'Etawah', 37.87, 'clear sky', 19800, 8, 6.69, 1004, '01d', '2024-03-23', 14, 'IN'),
(106, 'Kathmandu', 18.12, 'broken clouds', 20700, 63, 1.03, 1013, '04d', '2024-03-23', 14, 'NP'),
(107, 'Etawah', 37.13, 'broken clouds', 19800, 10, 5.07, 1007, '04d', '2024-03-26', 16, 'IN'),
(108, 'Etawah', 27.09, 'clear sky', 19800, 27, 2.78, 1008, '01d', '2024-03-30', 7, 'IN'),
(109, 'Etawah', 29.22, 'broken clouds', 19800, 17, 3.06, 1009, '04n', '2024-04-11', 0, 'IN'),
(110, 'Etawah', 27.22, 'overcast clouds', 19800, 42, 3.11, 1009, '04n', '2024-04-14', 2, 'IN'),
(111, 'Etawah', 39.47, 'clear sky', 19800, 11, 4.75, 1005, '01d', '2024-04-24', 13, 'IN'),
(112, 'Etawah', 31.52, 'clear sky', 19800, 10, 3.16, 1001, '01n', '2024-05-05', 1, 'IN'),
(113, 'Etawah', 42.19, 'few clouds', 19800, 12, 3.18, 1002, '02d', '2024-05-08', 14, 'IN'),
(114, 'Etawah', 40.70, 'overcast clouds', 19800, 14, 3.60, 998, '04d', '2024-06-11', 18, 'IN'),
(115, 'Etawah', 36.60, 'scattered clouds', 19800, 25, 7.49, 998, '03n', '2024-06-13', 2, 'IN'),
(116, 'Etawah', 40.17, 'overcast clouds', 19800, 34, 4.87, 998, '04d', '2024-06-27', 14, 'IN'),
(117, 'Etawah', 30.09, 'overcast clouds', 19800, 71, 3.40, 999, '04n', '2024-07-04', 22, 'IN'),
(118, 'Etawah', 34.60, 'few clouds', 19800, 53, 3.02, 1000, '02d', '2024-07-30', 9, 'IN'),
(119, 'kathmandu', 23.12, 'drizzle', 20700, 100, 3.09, 1005, '09d', '2024-07-30', 9, 'NP'),
(120, 'Etawah', 26.53, 'overcast clouds', 19800, 88, 3.42, 1005, '04n', '2024-08-08', 23, 'IN'),
(121, 'Etawah', 28.27, 'overcast clouds', 19800, 77, 1.60, 1003, '04d', '2024-08-11', 8, 'IN'),
(122, 'Kathmandu', 22.12, 'drizzle', 20700, 100, 1.03, 1008, '09d', '2024-08-11', 8, 'NP'),
(123, 'Etawah', 27.26, 'overcast clouds', 19800, 84, 2.49, 1001, '04n', '2024-08-12', 2, 'IN'),
(124, 'Etawah', 34.31, 'broken clouds', 19800, 54, 3.07, 1002, '04d', '2024-08-17', 14, 'IN'),
(125, 'Kathmandu', 29.12, 'broken clouds', 20700, 58, 5.14, 1004, '04d', '2024-08-17', 14, 'NP'),
(126, 'Etawah', 27.98, 'overcast clouds', 19800, 82, 2.48, 1004, '04n', '2024-08-21', 21, 'IN'),
(127, 'Nuwakot', 25.63, 'scattered clouds', 20700, 91, 1.74, 1010, '03n', '2024-08-21', 21, 'NP'),
(128, 'Nepaltar', 17.67, 'broken clouds', 20700, 99, 1.03, 1010, '04n', '2024-08-21', 21, 'NP'),
(129, 'Etawah', 31.44, 'scattered clouds', 19800, 66, 1.96, 1004, '03d', '2024-08-22', 10, 'IN'),
(130, 'Etawah', 28.13, 'broken clouds', 19800, 80, 4.36, 1005, '04n', '2024-09-02', 20, 'IN'),
(131, 'Etawah', 28.96, 'broken clouds', 19800, 68, 2.10, 1004, '04n', '2024-09-20', 19, 'IN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `weather_details`
--
ALTER TABLE `weather_details`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `weather_details`
--
ALTER TABLE `weather_details`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
