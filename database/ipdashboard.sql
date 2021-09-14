-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 14, 2021 at 08:29 PM
-- Server version: 5.7.35-0ubuntu0.18.04.1
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ipdashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `actions`
--

CREATE TABLE `actions` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `actions`
--

INSERT INTO `actions` (`id`, `userId`, `name`, `description`) VALUES
(1, 1, 'test', 'dasdasdsadassdtest'),
(2, 12, 'test', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `quick`
--

CREATE TABLE `quick` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `company` varchar(200) NOT NULL,
  `idea` varchar(200) NOT NULL,
  `myname` varchar(200) NOT NULL,
  `myemail` varchar(200) NOT NULL,
  `category` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quick`
--

INSERT INTO `quick` (`id`, `userId`, `email`, `company`, `idea`, `myname`, `myemail`, `category`, `date`, `status`) VALUES
(1, 1, 'lalit@1wayit.com', 'fdsfsdfsd', 'fdsfsdfds', 'dsada', 'sadsad@yopmail.com', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `role` int(11) NOT NULL,
  `parent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `email`, `phone`, `password`, `role`, `parent`) VALUES
(1, 'sdsadasdad', 'admin@gmail.com', NULL, 'e6e061838856bf47e1de730719fb2609', 1, 0),
(6, 'test', 'test@yopmail.com', 8888, '3aea223eed6982b7d3a8b2a2f1ea91d6', 1, 1),
(7, 'user', 'user@yopmail.com', 98765, 'e6e061838856bf47e1de730719fb2609', 2, 1),
(9, 'man', 'man@yopmail.com', 9876543210, '5b92e45d7ac5e8dca5f4fbb8530cf56c', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quick`
--
ALTER TABLE `quick`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `quick`
--
ALTER TABLE `quick`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
