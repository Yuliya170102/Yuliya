-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: up11
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL,
  `userNameId` int NOT NULL,
  `productName` varchar(45) NOT NULL,
  `descr` varchar(250) NOT NULL,
  `createAt` date NOT NULL,
  `link` varchar(250) NOT NULL,
  `vendorId` int NOT NULL,
  `photoLink` varchar(250) DEFAULT NULL,
  `hashTags` varchar(150) NOT NULL,
  `discount` int NOT NULL,
  `validUntil` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_idx` (`userNameId`),
  KEY `fk_vendors_idx` (`vendorId`),
  CONSTRAINT `fk_users` FOREIGN KEY (`userNameId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vendors` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,2,'Спортивный костюм','Скидка на женский спортивный костюм -20%','2021-03-19','https://sisters.by/catalog/clothing/sportivnye-kostyumy/komplekt-20-24-2.html',1,'https://sisters.by/_thumbs/items-product_page_item_mobile/icon-147870.jpg','одежда',20,'2021-04-16'),(2,1,'Свитер','Скидка на свитер -58%','2021-04-13','https://www.lamoda.by/p/by004ewllwn1/clothes-byswan-sviter/',2,'https://a.lmcdn.ru/img600x866/B/Y/BY004EWLLWN1_12690724_2_v1_2x.jpg','одежда',58,'2021-05-24'),(3,3,'Блузка','Скидка на блузку -40%','2021-03-16','https://sisters.by/catalog/clothing/bluzki-i-rubashki/bluzka-vit-21-1611x.html',1,'https://sisters.by/_thumbs/items-product_page_item_mobile/icon-148023.jpg','одежда',40,'2021-04-16'),(4,9,'Стайлер','Скидка на стайлер POLARIS -45%','2021-03-01','https://sila.by/bt/stajlery/POLARIS/phs_2405k_',3,'https://sila.by/img/catalog2015/bt/tovar70534.jpg','техника',45,'2021-04-15'),(5,4,'Вытяжка','Скидка на вытяжку BOSCH -20%','2021-02-27','https://sila.by/vt/vytyazhki/BOSCH/dhi642eq',3,'https://sila.by/img/catalog2015/vt/tovar69256.jpg','техника',20,'2021-03-31'),(6,6,'Книга','Скидка на книгу \"Взламывая мозг\" -7%','2021-03-01','https://oz.by/books/more10976092.html',4,'https://s2-goods.ozstatic.by/2000/92/976/10/10976092_0.jpg','книга',7,'2021-05-30'),(7,5,'Гель для душа','Скидка на гель для душа -35%','2021-03-15','https://oz.by/showergels/more10843275.html',4,'https://s3-goods.ozstatic.by/2000/275/843/10/10843275_0.jpg','косметика',35,'2021-06-11'),(8,7,'Матрас','Скидка на матрас -46%','2021-05-15','https://pinskdrev.by/catalog/tolko-onlayn/matrasyi-mayya---sale/',5,'https://pinskdrev.by/web/files/imagick_cache/w580h580t3/web/catalogfiles/catalog/products/66df0686cefd8923ece4c7c790b4dafa.jpg','матрасы',46,'2021-06-15'),(9,10,'Игра','Скидка на игру \"Grand Theft Auto V\" -58%','2021-03-15','https://hot-game.info/game/grand-theft-auto-5',6,'https://hot-game.info/uploads/media/game/0001/10/thumb_9474_game_poster.jpeg','игры',58,'2021-08-30'),(10,8,'Игрушка','Скидка на мягкую игрушку -15%','2021-05-15','https://buslik.by/catalog/igrushki_i_igry/myagkie_igrushki/myagkie_zverushki/osminog_v_assort_malvina_15_141_1_6/',7,'https://buslik.by/upload/slam.image/iblock/589/5899e80c097d5ba77cc6467364b6c6ce-90.jpg','игрушки',15,'2021-04-23'),(11,1,'Витамины','Скидка на витамины -50%','2021-03-15','https://www.iherb.com/pr/California-Gold-Nutrition-Andrographis-Immune-with-AP-BIO-100-mg-120-Tablets/101059',8,'https://s3.images-iherb.com/cgn/cgn01819/v/10.jpg','здоровье',50,'2021-04-15'),(12,5,'Джинсы','Скидка на женские джинсы -36%','2021-03-15','https://www.wildberries.ru/catalog/15537164/detail.aspx?targetUrl=BP',9,'https://images.wbstatic.net/c516x688/new/15530000/15537164-1.jpg','одежда',36,'2021-06-12'),(13,4,'Кукла','Скидка на куклу -50%','2021-05-15','https://buslik.by/catalog/igrushki_i_igry/kukly_i_aksessuary/kukly_1/mini_kukly/kukla_dong_huan_big_tree_toys_12sm/',7,'https://buslik.by/upload/slam.image/iblock/a86/a86cec311e22d4396acf8b86e9f5efec-90.jpg','игрушки',50,'2021-05-10'),(14,5,'Книга','Скидка на книгу \"Метро 2033\" -20%','2021-03-01','https://oz.by/books/more10796109.html',4,'https://s5-goods.ozstatic.by/2000/109/796/10/10796109_0.jpg','книга',20,'2021-06-28'),(15,1,'Нож','Скидка на нож -15%','2021-04-21','https://oz.by/showergels/more10843275.html',4,'https://s3-https://s1-goods.ozstatic.by/2000/891/967/10/10967891_0.jpg','посуда',15,'2021-07-19'),(16,7,'Кеды','Скидка на кеды для мальчика - 50%','2021-05-20','https://buslik.by/catalog/odezhda_i_obuv/obuv/kedy/kedy_dlya_malchika_r_31_36_lemon_wl1211114shb_021/',7,'https://buslik.by/upload/slam.image/iblock/997/99705aea9bf9df54d30c2549ddf2e9fb-90.jpg','обувь',50,'2021-08-17'),(17,4,'Подгузники','Скидка на подгузники - 50%','2021-05-16','https://buslik.by/catalog/podguzniki/trusiki_podguzniki/trusiki_podguzniki_pampers_premium_care_econom_6_15_kg_31_sht/',7,'https://buslik.by/upload/slam.image/iblock/96a/96a1b4fc38c26c145ae11acebe24c3fd-90.jpg','товары для детей',50,'2021-06-03');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rewiews`
--

DROP TABLE IF EXISTS `rewiews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rewiews` (
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  `review` varchar(150) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `dateReview` date NOT NULL,
  PRIMARY KEY (`userId`,`productId`),
  KEY `fk_products` (`productId`),
  CONSTRAINT `fk_products` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_users1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rewiews`
--

LOCK TABLES `rewiews` WRITE;
/*!40000 ALTER TABLE `rewiews` DISABLE KEYS */;
INSERT INTO `rewiews` VALUES (1,11,NULL,4,'2021-03-20'),(1,13,'Хорошая игрушка!',4,'2021-05-09'),(2,6,NULL,0,'2021-04-04'),(3,13,'Класс',5,'2021-05-09'),(4,3,NULL,3,'2021-04-01'),(6,13,'Плохое качество!',0,'2021-05-09'),(7,13,'Всё супер!',5,'2021-05-09'),(8,9,NULL,4,'2021-05-09'),(9,4,'Отлично выпрямляет волосы!',4,'2021-03-02'),(10,7,NULL,2,'2021-05-21');
/*!40000 ALTER TABLE `rewiews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `userName` varchar(45) NOT NULL,
  `userRole` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Илья','Customer'),(2,'Ксения','Admin'),(3,'Павел','Customer'),(4,'Иван','Customer'),(5,'Юлия','Admin'),(6,'Егор','Customer'),(7,'Евгения','Admin'),(8,'Степан','Admin'),(9,'Владислав','Customer'),(10,'Роман','Admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `id` int NOT NULL,
  `vendorName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'Sisters'),(2,'lamoda'),(3,'Электросила'),(4,'OZ'),(5,'Пинскдрев'),(6,'Hot Games'),(7,'Буслик'),(8,'iHerb'),(9,'ТВОЕ'),(10,'Wildberries');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-21 10:28:06
