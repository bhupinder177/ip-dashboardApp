-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 21, 2021 at 07:17 AM
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
-- Table structure for table `idea_comments`
--

CREATE TABLE `idea_comments` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `comment` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `thinking` text,
  `myname` varchar(200) NOT NULL,
  `myemail` varchar(200) NOT NULL,
  `category` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quick`
--

INSERT INTO `quick` (`id`, `userId`, `email`, `company`, `idea`, `thinking`, `myname`, `myemail`, `category`, `date`, `status`) VALUES
(1, 1, 'lalit@1wayit.com', 'fdsfsdfsd', 'fdsfsdfds', NULL, 'dsada', 'sadsad@yopmail.com', NULL, NULL, 0),
(4, 1, '', '', 'dasdadsada', 'dsadadasdasda', '', '', 1, '2021-09-19', 0),
(5, 1, '', '', 'ddsad', 'feffsff', '', '', 1, '2021-09-19', 0),
(6, 1, '', '', 'ddsad', 'feffsff', '', '', 1, '2021-09-19', 0),
(7, 1, '', '', 'ddsad', 'feffsff', '', '', 1, '2021-09-19', 0),
(8, 1, '', '', 'dsad', 'dda', '', '', 1, '2021-09-19', 0),
(9, 1, '', '', 'dsad', 'dda', '', '', 1, '2021-09-19', 1),
(10, 1, '', '', 'dsad', 'dda', '', '', 1, '2021-09-19', 1),
(11, 1, '', '', 'dsdasdsad', 'sadad', '', '', 1, '2021-09-19', 1),
(12, 1, '', '', 'dsdasdsad', 'sadad', '', '', 1, '2021-09-19', 1),
(13, 1, '', '', 'dsdasdsad', 'sadad', '', '', 1, '2021-09-19', 1),
(14, 1, '', '', 'dsdasdsad', 'sadad', '', '', 1, '2021-09-19', 1),
(15, 1, '', '', 'dsdasdsad', 'sadad', '', '', 1, '2021-09-19', 1),
(16, 1, '', '', 'ddasd', 'dsad', '', '', 1, '2021-09-19', 1),
(17, 1, '', '', 'dff', 'fdsf', '', '', 1, '2021-09-19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quick_assign`
--

CREATE TABLE `quick_assign` (
  `quick_assignId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `quickId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quick_comments`
--

CREATE TABLE `quick_comments` (
  `quick_commentId` int(11) NOT NULL,
  `comment` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `like` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quick_images`
--

CREATE TABLE `quick_images` (
  `quick_imagesId` int(11) NOT NULL,
  `image` varchar(200) NOT NULL,
  `quickId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `idea_comments`
--
ALTER TABLE `idea_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quick`
--
ALTER TABLE `quick`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quick_assign`
--
ALTER TABLE `quick_assign`
  ADD PRIMARY KEY (`quick_assignId`);

--
-- Indexes for table `quick_comments`
--
ALTER TABLE `quick_comments`
  ADD PRIMARY KEY (`quick_commentId`);

--
-- Indexes for table `quick_images`
--
ALTER TABLE `quick_images`
  ADD PRIMARY KEY (`quick_imagesId`);

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
-- AUTO_INCREMENT for table `idea_comments`
--
ALTER TABLE `idea_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quick`
--
ALTER TABLE `quick`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `quick_assign`
--
ALTER TABLE `quick_assign`
  MODIFY `quick_assignId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quick_comments`
--
ALTER TABLE `quick_comments`
  MODIFY `quick_commentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quick_images`
--
ALTER TABLE `quick_images`
  MODIFY `quick_imagesId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
