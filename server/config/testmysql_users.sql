-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: testmysql
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `salt` varchar(45) DEFAULT NULL,
  `hashed_password` varchar(45) NOT NULL,
  `resetPasswordLink` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'subscriber','Szymon','szymon@gmail.com',NULL,'rrrrrrasd',NULL),(2,'subscriber','Next','next@gmail.com','650646195501','rrrrrrasd',NULL),(3,'subscriber','Next2','next2@gmail.com','1577394355507','',NULL),(4,'subscriber','xx','xxxx@gmail.com','208466169453','',NULL),(6,'subscriber','asd','asd@gmail.com','541842825774','',NULL),(7,'subscriber','zxc','zxc@gmail.com','661733422241','',NULL),(8,'subscriber','zs','zs@gmail.com','942409075219','',NULL),(9,'subscriber','qw','qw@gmail.com','46144109334','',NULL),(10,'subscriber','ghj','ghj@gmail.com','1603716310762','',NULL),(11,'subscriber','fgh','fgh@gmail.com','561170727778','rrrrrrasd',NULL),(12,'subscriber','rty','rty@gmail.com','169833819577','test',NULL),(13,'subscriber','ytr','ytr@gmail.com','902449506030','902449506030',NULL),(14,'subscriber','vvvr','vvytr@gmail.com','1604767687610','',NULL),(15,'subscriber','aaa','aaa@gmail.com','470946125814','',NULL),(16,'subscriber','xxx','xxx@gmail.com','1430714255128','',NULL),(18,'subscriber','aaa','aaaa@gmail.com','166487524142','',NULL),(19,'subscriber','aaa','aaadddda@gmail.com','1478453895522','',NULL),(20,'subscriber','aaa','aaaerdddda@gmail.com','1497195337316','',NULL),(21,'subscriber','aaa','aaxxxda@gmail.com','1127459512385','',NULL),(22,'subscriber','ggg','aaggxda@gmail.com','916949774872','b257874c5aa35f574e93e8158c5af60be7122cf3',NULL),(23,'subscriber','ggsg','assaggxda@gmail.com','174457664830','',NULL),(24,'subscriber','fffffg','dddddda@gmail.com','619882688079','45853bbc43a8370032973da1d86257eb381021cf',NULL),(26,'admin','Szymon','cykcykacz@gmail.com','414586577864','41b4ce86ffe43f29b23d842da66ad82d0e72a933',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-23  3:40:10
