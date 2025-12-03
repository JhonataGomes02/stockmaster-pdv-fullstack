CREATE DATABASE  IF NOT EXISTS `repositorio_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `repositorio_db`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: repositorio_db
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeCliente` varchar(255) NOT NULL,
  `nomeProduto` varchar(255) NOT NULL,
  `produtoId` int NOT NULL,
  `quantidade` int NOT NULL,
  `valorTotal` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Concluido',
  `dataPedido` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `utilizadorId` int DEFAULT NULL,
  `formaPagamento` varchar(255) NOT NULL DEFAULT 'Dinheiro',
  PRIMARY KEY (`id`),
  KEY `FK_dfd661ad64b89eacc5c9f926cac` (`utilizadorId`),
  CONSTRAINT `FK_dfd661ad64b89eacc5c9f926cac` FOREIGN KEY (`utilizadorId`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'Consumidor Final','cenoura',35,2,4.00,'Concluido','2025-11-29 01:41:24.139438',1,'Dinheiro'),(2,'Consumidor Final 2','maça',36,3,9.00,'Concluido','2025-11-29 01:42:58.421760',2,'Dinheiro'),(3,'Consumidor Final','maça',36,4,12.00,'Concluido','2025-11-29 01:51:00.777407',2,'Dinheiro'),(4,'Consumidor Final','pão',37,6,6.00,'Concluido','2025-11-29 01:51:00.780150',2,'Dinheiro'),(5,'Consumidor Final','Coca Cola ',39,5,45.00,'Concluido','2025-11-29 20:23:33.603632',1,'Dinheiro'),(6,'Consumidor Final','cenoura',35,1,2.00,'Concluido','2025-11-29 20:23:33.605233',1,'Dinheiro'),(7,'Consumidor Final','Coca Cola ',39,2,18.00,'Concluido','2025-11-30 15:33:20.518116',1,'Dinheiro'),(8,'Consumidor Final','rabanete',38,1,3.00,'Concluido','2025-11-30 15:33:20.517802',1,'Dinheiro'),(9,'Consumidor Final','cenoura',35,1,2.00,'Concluido','2025-11-30 15:33:20.516725',1,'Dinheiro'),(10,'Consumidor Final','rabanete',38,1,3.00,'Concluido','2025-11-30 15:40:05.861152',1,'Dinheiro'),(11,'Consumidor Final','Coca Cola ',39,1,9.00,'Concluido','2025-11-30 15:40:05.862635',1,'Dinheiro'),(12,'Consumidor Final','rabanete',38,3,9.00,'Concluido','2025-11-30 15:40:54.963222',1,'Dinheiro'),(13,'Consumidor Final','cenoura',35,1,2.00,'Concluido','2025-11-30 15:40:54.965276',1,'Dinheiro'),(14,'Consumidor Final','Coca Cola ',39,1,9.00,'Concluido','2025-11-30 20:00:43.961532',1,'Dinheiro'),(15,'Consumidor Final','rabanete',38,1,3.00,'Concluido','2025-11-30 20:00:43.960390',1,'Dinheiro'),(16,'Consumidor Final','cenoura',35,5,10.00,'Concluido','2025-11-30 20:00:43.961222',1,'Dinheiro'),(17,'Cesar','Limão',40,2,6.00,'Concluido','2025-11-30 22:16:51.387750',1,'Dinheiro'),(18,'Consumidor Final','rabanete',38,1,3.00,'Concluido','2025-11-30 22:17:07.349653',1,'Dinheiro'),(19,'Consumidor Final','Coca Cola ',39,1,9.00,'Concluido','2025-11-30 22:17:07.351011',1,'Dinheiro'),(20,'Consumidor Final','cenoura',35,1,2.00,'Concluido','2025-11-30 22:17:37.619521',1,'Dinheiro'),(21,'Consumidor Final','Limão',40,1,3.00,'Concluido','2025-11-30 22:17:51.565342',1,'Dinheiro'),(22,'Cesar','Coca Cola ',39,1,9.00,'Concluido','2025-11-30 22:18:04.349213',1,'Dinheiro'),(23,'Cesar','Limão',40,1,3.00,'Concluido','2025-11-30 22:18:04.351671',1,'Dinheiro'),(24,'Cesar','rabanete',38,1,3.00,'Concluido','2025-11-30 22:18:04.351937',1,'Dinheiro'),(25,'Consumidor Final','cenoura',35,1,2.00,'Concluido','2025-11-30 22:18:29.352309',1,'Dinheiro'),(26,'Teste Forma de Pag','rabanete',38,2,6.00,'Concluido','2025-11-30 22:42:55.784991',1,'PIX'),(27,'Teste Forma de Pag','Limão',40,1,3.00,'Concluido','2025-11-30 22:42:55.785692',1,'PIX'),(28,'Consumidor Final','rabanete',38,3,9.00,'Concluido','2025-11-30 22:43:30.723054',1,'Dinheiro'),(29,'Consumidor Final','cenoura',35,1,2.00,'Concluido','2025-11-30 22:52:48.735435',1,'Crédito'),(30,'Consumidor Final','rabanete',38,1,3.00,'Concluido','2025-11-30 22:54:00.235129',1,'Débito'),(31,'Consumidor Final','rabanete',38,1,3.00,'Concluido','2025-11-30 23:05:55.858120',1,'Débito'),(32,'Consumidor Final','Coca Cola ',39,7,63.00,'Concluido','2025-11-30 23:31:53.713749',1,'PIX'),(33,'Consumidor Final','rabanete',38,1,3.00,'Concluido','2025-11-30 23:31:53.715126',1,'PIX');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `quantidade` int NOT NULL,
  `utilizadorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3c151b26515e028e43325f1af2e` (`utilizadorId`),
  CONSTRAINT `FK_3c151b26515e028e43325f1af2e` FOREIGN KEY (`utilizadorId`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (35,'cenoura','Hortifruti',2.00,87,1),(36,'maça','Hortifruti',3.00,3,2),(37,'pão','Padaria / Confeitaria',1.00,194,2),(38,'rabanete','Hortifruti',3.00,4,1),(39,'Coca Cola ','Bebidas',9.00,2,1),(40,'Limão','Hortifruti',3.00,25,1);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilizador`
--

DROP TABLE IF EXISTS `utilizador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilizador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c5ca9eda214ffbe5b71c8f0b91` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilizador`
--

LOCK TABLES `utilizador` WRITE;
/*!40000 ALTER TABLE `utilizador` DISABLE KEYS */;
INSERT INTO `utilizador` VALUES (1,'jotasilva@teste.com','$2b$10$lE04IWzhzDBBWIV7UfkVTe3Xy3x9dKn7SHszlnBPDwo9C.BrCfCTm','Mercado Jota Silva'),(2,'zemercado@teste.com','$2b$10$w0Cy9/e23hKFZTbhlbcCVefw.BwI5bZJUkdnZBE5lIAOs24Ju38yq','Zé mercado');
/*!40000 ALTER TABLE `utilizador` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-30 23:45:49
