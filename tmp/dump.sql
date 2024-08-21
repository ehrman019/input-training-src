-- MySQL dump 10.13  Distrib 8.0.38, for Linux (x86_64)
--
-- Host: localhost    Database: docker_db
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer_sheets`
--

DROP TABLE IF EXISTS `answer_sheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer_sheets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sheet_id` int NOT NULL,
  `sheet_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sheet_date` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `sheet_id` (`sheet_id`),
  CONSTRAINT `answer_sheets_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer_sheets`
--

LOCK TABLES `answer_sheets` WRITE;
/*!40000 ALTER TABLE `answer_sheets` DISABLE KEYS */;
INSERT INTO `answer_sheets` VALUES (1,1,'001','2024-08-01'),(2,1,'002','2024-08-02'),(3,1,'003','2024-08-02');
/*!40000 ALTER TABLE `answer_sheets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `answer_sheet_id` int NOT NULL,
  `question_id` int NOT NULL,
  `input_id` int NOT NULL,
  `answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `answer_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `answer_sheet_id` (`answer_sheet_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`answer_sheet_id`) REFERENCES `answer_sheets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,1,1,1,'2',''),(2,1,1,2,'',''),(3,1,2,1,'07:00',''),(4,1,2,2,'08:00',''),(5,1,3,1,'2',''),(6,1,4,1,'2,3',''),(7,1,4,2,'',''),(8,1,5,1,'3',''),(9,1,6,1,'1',''),(10,2,1,1,'1',''),(11,2,1,2,'','毎日の運動'),(12,2,2,1,'06:30',''),(13,2,2,2,'08:30',''),(14,2,3,1,'1',''),(15,2,4,1,'1',''),(16,2,4,2,'',''),(17,2,5,1,'1',''),(18,2,6,1,'2',''),(19,3,1,1,'3',''),(20,3,1,2,'','考え事をしてしまう'),(21,3,2,1,'09:00',''),(22,3,2,2,'10:00',''),(23,3,3,1,'3',''),(24,3,4,1,'2',''),(25,3,4,2,'','倦怠感'),(26,3,5,1,'4',''),(27,3,6,1,'3','');
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choices`
--

DROP TABLE IF EXISTS `choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sheet_id` int NOT NULL,
  `question_id` int NOT NULL,
  `input_id` int NOT NULL,
  `choice_id` int NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sheet_id` (`sheet_id`),
  CONSTRAINT `choices_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choices`
--

LOCK TABLES `choices` WRITE;
/*!40000 ALTER TABLE `choices` DISABLE KEYS */;
INSERT INTO `choices` VALUES (1,1,1,1,1,'よく眠れた'),(2,1,1,1,2,'普通'),(3,1,1,1,3,'時々眠れない時がある'),(4,1,1,1,4,'眠れない日が多い'),(5,1,1,1,5,'ほとんど眠れない'),(6,1,3,1,1,'体調に問題なく活動出来ている'),(7,1,3,1,2,'体調不良が1～2日間あった'),(8,1,3,1,3,'体調不良が3～4日間あった'),(9,1,3,1,4,'ほとんど体調不良だった'),(10,1,4,1,1,'特に症状なし'),(11,1,4,1,2,'頭痛'),(12,1,4,1,3,'発熱'),(13,1,4,1,4,'咳'),(14,1,4,1,5,'のどの痛み'),(15,1,4,1,6,'息切れ'),(16,1,4,1,7,'胃痛'),(17,1,5,1,1,'ほぼ毎日運動した'),(18,1,5,1,2,'週3～4日運動した'),(19,1,5,1,3,'週1～2日運動した'),(20,1,5,1,4,'ほぼ運動しなかった'),(21,1,6,1,1,'1日3食'),(22,1,6,1,2,'1日2食'),(23,1,6,1,3,'1日1食'),(24,1,6,1,4,'日によって食べる回数が違う');
/*!40000 ALTER TABLE `choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inputs`
--

DROP TABLE IF EXISTS `inputs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inputs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sheet_id` int NOT NULL,
  `question_id` int NOT NULL,
  `input_id` int NOT NULL,
  `kind` int NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sheet_id` (`sheet_id`),
  CONSTRAINT `inputs_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inputs`
--

LOCK TABLES `inputs` WRITE;
/*!40000 ALTER TABLE `inputs` DISABLE KEYS */;
INSERT INTO `inputs` VALUES (1,1,1,1,1,''),(2,1,1,2,7,'理由：'),(3,1,2,1,5,'平日：'),(4,1,2,2,5,'休日：'),(5,1,3,1,1,''),(6,1,4,1,2,''),(7,1,4,2,7,'その他（具体的に記入）：'),(8,1,5,1,1,''),(9,1,6,1,1,'');
/*!40000 ALTER TABLE `inputs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sheet_id` int NOT NULL,
  `question_id` int NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sheet_id` (`sheet_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,1,'①1週間の睡眠について'),(2,1,2,'②1週間の平均起床時間について'),(3,1,3,'③1週間の体調について'),(4,1,4,'④1週間であった症状'),(5,1,5,'⑤1週間の運動について'),(6,1,6,'⑥1週間の食事について');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sheets`
--

DROP TABLE IF EXISTS `sheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sheets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sheets`
--

LOCK TABLES `sheets` WRITE;
/*!40000 ALTER TABLE `sheets` DISABLE KEYS */;
INSERT INTO `sheets` VALUES (1,'健康チェックシート');
/*!40000 ALTER TABLE `sheets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-04 16:41:26
