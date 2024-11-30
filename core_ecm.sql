-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: barbershop_online
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
-- Table structure for table `acl_model_has_permissions`
--

DROP TABLE IF EXISTS `acl_model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acl_model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `acl_model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `acl_permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_model_has_permissions`
--

LOCK TABLES `acl_model_has_permissions` WRITE;
/*!40000 ALTER TABLE `acl_model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `acl_model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_model_has_roles`
--

DROP TABLE IF EXISTS `acl_model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acl_model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `acl_model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_model_has_roles`
--

LOCK TABLES `acl_model_has_roles` WRITE;
/*!40000 ALTER TABLE `acl_model_has_roles` DISABLE KEYS */;
INSERT INTO `acl_model_has_roles` VALUES (1,'App\\Models\\UserApi',1);
/*!40000 ALTER TABLE `acl_model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_permissions`
--

DROP TABLE IF EXISTS `acl_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acl_permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `acl_permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_permissions`
--

LOCK TABLES `acl_permissions` WRITE;
/*!40000 ALTER TABLE `acl_permissions` DISABLE KEYS */;
INSERT INTO `acl_permissions` VALUES (1,'all','api','all','Toàn quyền','2024-10-20 03:47:11','2024-10-20 03:47:11'),(2,'product_index','api','product_index','Danh sách sản phẩm','2024-10-20 03:47:11','2024-10-20 03:47:11');
/*!40000 ALTER TABLE `acl_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_role_has_permissions`
--

DROP TABLE IF EXISTS `acl_role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acl_role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `acl_role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `acl_role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `acl_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `acl_role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_role_has_permissions`
--

LOCK TABLES `acl_role_has_permissions` WRITE;
/*!40000 ALTER TABLE `acl_role_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `acl_role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_roles`
--

DROP TABLE IF EXISTS `acl_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acl_roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `acl_roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_roles`
--

LOCK TABLES `acl_roles` WRITE;
/*!40000 ALTER TABLE `acl_roles` DISABLE KEYS */;
INSERT INTO `acl_roles` VALUES (1,'administrator','api','Toàn quyền','2024-10-20 03:47:11','2024-10-20 03:47:11'),(2,'manage','api','Quản lý','2024-10-20 03:47:11','2024-10-20 03:47:11'),(3,'general_director','api','Tổng giám đốc','2024-10-20 03:47:11','2024-10-20 03:47:11'),(4,'staff','api','Nhân viên','2024-10-20 03:47:11','2024-10-20 03:47:11');
/*!40000 ALTER TABLE `acl_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banks`
--

DROP TABLE IF EXISTS `banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `swift_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banks`
--

LOCK TABLES `banks` WRITE;
/*!40000 ALTER TABLE `banks` DISABLE KEYS */;
/*!40000 ALTER TABLE `banks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bl_articles`
--

DROP TABLE IF EXISTS `bl_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bl_articles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `author_id` int DEFAULT NULL,
  `menu_id` bigint unsigned NOT NULL,
  `is_featured` tinyint NOT NULL DEFAULT '0',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` bigint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bl_articles_menu_id_foreign` (`menu_id`),
  KEY `bl_articles_author_id_index` (`author_id`),
  CONSTRAINT `bl_articles_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `bl_menus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bl_articles`
--

LOCK TABLES `bl_articles` WRITE;
/*!40000 ALTER TABLE `bl_articles` DISABLE KEYS */;
INSERT INTO `bl_articles` VALUES (4,'ĐỘC QUYỀN WEBSITE - VOUCHER 100K CHO KHÁCH HÀNG ĐĂNG KÍ EMAIL',NULL,'adadadadada','<p>Nội dung1212</p>','pending',NULL,4,0,'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/4.%20%C4%90%C4%82NG%20K%C3%8D%20TH%C3%94NG%20TIN.jpg',0,'2024-10-20 03:47:11',NULL),(7,'Tặng ngay Voucher 25K cho khách hàng Follow Zalo YODY trong tháng 10',NULL,'Ưu đãi cực Hot trong tháng 10, chỉ cần quý khách thao tác theo dõi kênh Zalo OA của YODY sẽ được nhận ngay Voucher giảm giá','<p>Nội dung</p>','published',NULL,3,0,'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/2.%20ZALO%20YODY%2050K.jpg',0,'2024-10-27 05:42:41',NULL),(8,'Ưu đãi lớn nhất năm 2024 - SALE CUỐI MÙA LÊN ĐẾN 50%',NULL,'Quý khách có thể thực hiện mua sắm trực tiếp tại hệ thống Online Yody bao gồm Website, Fanpge, Zalo OA hoặc trực tiếp tại hơn 270 cửa hàng YODY trên toàn quốc.','<p>Nội dung</p>','pending',NULL,4,0,'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-sale-cuoi-mua.png',0,'2024-10-27 05:42:41',NULL),(11,'ĐỘC QUYỀN WEBSITE - VOUCHER 100K CHO KHÁCH HÀNG ĐĂNG KÍ EMAIL',NULL,'Thời gian nhận và sử dụng mã khuyến mãi kéo dài từ ngày 01/10/2024 đến ngày 31/10/2024. Sau khi nhận mã, khách hàng sẽ sử dụng trực tiếp để mua hàng trên Website (không áp dụng tại cửa hàng).','<p>Nội dung</p>','pending',NULL,3,0,'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/4.%20%C4%90%C4%82NG%20K%C3%8D%20TH%C3%94NG%20TIN.jpg',0,NULL,NULL),(13,'1212121',NULL,'21','<p>12212121</p>','pending',NULL,3,0,'http://localhost:3014/uploads/images/264f3cbf-b3e6-49c0-9e4b-3bfe4b18a32f.png',0,NULL,NULL);
/*!40000 ALTER TABLE `bl_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bl_articles_tags`
--

DROP TABLE IF EXISTS `bl_articles_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bl_articles_tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `tag_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bl_articles_tags_article_id_foreign` (`article_id`),
  KEY `bl_articles_tags_tag_id_foreign` (`tag_id`),
  CONSTRAINT `bl_articles_tags_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `bl_articles` (`id`),
  CONSTRAINT `bl_articles_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `bl_tags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bl_articles_tags`
--

LOCK TABLES `bl_articles_tags` WRITE;
/*!40000 ALTER TABLE `bl_articles_tags` DISABLE KEYS */;
INSERT INTO `bl_articles_tags` VALUES (18,7,11),(19,7,4);
/*!40000 ALTER TABLE `bl_articles_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bl_menus`
--

DROP TABLE IF EXISTS `bl_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bl_menus` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_featured` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bl_menus`
--

LOCK TABLES `bl_menus` WRITE;
/*!40000 ALTER TABLE `bl_menus` DISABLE KEYS */;
INSERT INTO `bl_menus` VALUES (2,'Thời trang thế giới','thoi-trang-the-gioi','Thời trang thế giới','published',1,'2024-10-20 03:47:11',NULL),(3,'Đồng phục','dong-phuc','Đồng phục','published',1,'2024-10-20 03:47:11',NULL),(4,'Tin tức thời trang',NULL,'Tin tức thời trang','published',1,'2024-10-25 02:53:11',NULL);
/*!40000 ALTER TABLE `bl_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bl_tags`
--

DROP TABLE IF EXISTS `bl_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bl_tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_featured` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bl_tags`
--

LOCK TABLES `bl_tags` WRITE;
/*!40000 ALTER TABLE `bl_tags` DISABLE KEYS */;
INSERT INTO `bl_tags` VALUES (1,'thời trang nổi bật',NULL,'thời trang nổi bật','published',1,'2024-10-20 03:47:11',NULL),(3,'Đồng phục',NULL,'Đồng phục','published',1,'2024-10-20 03:47:11',NULL),(4,'thời trang nổi bật',NULL,'thời trang nổi bật','published',1,'2024-10-25 02:58:38',NULL),(5,'xu hướng',NULL,'xu hướng','published',1,'2024-10-25 02:58:38',NULL),(6,'thoáng mát',NULL,'thoáng mát','published',1,'2024-10-25 02:58:38',NULL),(7,'thời trang nổi bật',NULL,'thời trang nổi bật','published',1,'2024-10-25 03:12:45',NULL),(8,'xu hướng',NULL,'xu hướng','published',1,'2024-10-25 03:12:45',NULL),(9,'thoáng mát',NULL,'thoáng mát','published',1,'2024-10-25 03:12:45',NULL),(11,'xu hướng 1221',NULL,'xu hướng','pending',0,'2024-10-25 20:51:50',NULL),(12,'thoáng mát','thoang-mat','thoáng mát','published',1,'2024-10-25 20:51:50',NULL),(14,'2212',NULL,'2121211','pending',0,NULL,NULL),(16,'từ khoá mới nhập',NULL,'từ khoá mới nhập','pending',0,NULL,NULL);
/*!40000 ALTER TABLE `bl_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int NOT NULL DEFAULT '0',
  `title_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `index_seo` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_parent_id_index` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (5,'Dầu dưỡng xả','dau-duong-xa',NULL,NULL,'pending','Dầu dưỡng xả',0,NULL,NULL,NULL,1,'2024-10-20 03:47:11',NULL),(7,'Tạo kiểu tóc','tao-kieu-toc',NULL,NULL,'pending','Tạo kiểu tóc',0,NULL,NULL,NULL,1,'2024-10-25 01:47:55',NULL),(8,'Chăm sóc da mặt','cham-soc-da-mat',NULL,NULL,'pending','Chăm sóc da mặt',0,NULL,NULL,NULL,1,'2024-10-25 01:47:55',NULL),(10,'Chăm sóc tóc','cham-soc-toc',NULL,NULL,'pending','Chăm sóc tóc',0,NULL,NULL,NULL,1,'2024-10-25 01:47:55',NULL),(11,'Chăm sóc cơ thể','cham-soc-co-the',NULL,NULL,'pending','Chăm sóc cơ thể',0,NULL,NULL,NULL,1,'2024-10-25 01:47:55',NULL),(12,'Thực phẩm chức năng','thuc-pham-chuc-nang',NULL,NULL,'pending','Thực phẩm chức năng',0,NULL,NULL,NULL,1,'2024-10-25 01:47:55',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_attribute_values`
--

DROP TABLE IF EXISTS `ec_attribute_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_attribute_values` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `attribute_id` bigint unsigned NOT NULL,
  `is_default` tinyint NOT NULL DEFAULT '0',
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_attribute_values_attribute_id_foreign` (`attribute_id`),
  CONSTRAINT `ec_attribute_values_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `ec_attributes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_attribute_values`
--

LOCK TABLES `ec_attribute_values` WRITE;
/*!40000 ALTER TABLE `ec_attribute_values` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_attribute_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_attributes`
--

DROP TABLE IF EXISTS `ec_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_attributes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint NOT NULL DEFAULT '0',
  `is_use_in_product_listing` tinyint NOT NULL DEFAULT '0',
  `use_image_from_product_variation` tinyint NOT NULL DEFAULT '0',
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_attributes`
--

LOCK TABLES `ec_attributes` WRITE;
/*!40000 ALTER TABLE `ec_attributes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_brands`
--

DROP TABLE IF EXISTS `ec_brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_brands` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `index_seo` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_brands`
--

LOCK TABLES `ec_brands` WRITE;
/*!40000 ALTER TABLE `ec_brands` DISABLE KEYS */;
INSERT INTO `ec_brands` VALUES (1,'Chanel','chanel','https://cdn-copck.nitrocdn.com/WwybsgZzWtFojdWowVAajDJCKuMAXRVm/assets/images/optimized/rev-327d879/rubicmarketing.com/wp-content/uploads/2022/11/logo-chanel.jpg','published',NULL,NULL,NULL,NULL,1,'2024-10-20 03:47:11',NULL),(2,'Gucci','gucci','https://inkythuatso.com/uploads/thumbnails/800/2021/11/gucci-logo-inkythuatso-01-02-10-02-14.jpg','published',NULL,NULL,NULL,NULL,1,'2024-10-20 03:47:11',NULL),(3,'Zara','zara','https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1280px-Zara_Logo.svg.png','published',NULL,NULL,NULL,NULL,1,'2024-10-25 01:50:40',NULL),(4,'H&M','hm','https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png','published',NULL,NULL,NULL,NULL,1,'2024-10-25 01:50:40',NULL),(5,'Adidas','adidas','https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg','published',NULL,NULL,NULL,NULL,1,'2024-10-25 01:50:40',NULL),(6,'Nike','nike','https://img.favpng.com/25/2/1/swoosh-nike-logo-just-do-it-adidas-png-favpng-KMjV5sizT4FG7v09BEnKe7mRA.jpg','published',NULL,NULL,NULL,NULL,1,'2024-10-25 01:50:40',NULL),(7,'Levi\'s','levis','https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Levi%27s_logo.svg/2560px-Levi%27s_logo.svg.png','published',NULL,NULL,NULL,NULL,1,'2024-10-25 01:50:40',NULL),(8,'Puma','puma','https://www.logodesignvalley.com/blog/wp-content/uploads/2023/05/puma-2.png','published',NULL,NULL,NULL,NULL,1,'2024-10-25 01:50:40',NULL),(9,'Balenciage','balenciage','https://bizweb.dktcdn.net/thumb/grande/100/106/923/products/balenciaga-logo-3.png?v=1617552563317','published',NULL,NULL,NULL,NULL,1,'2024-10-25 01:50:40',NULL),(10,'Yody','yody','https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Yody.png','published',NULL,NULL,NULL,NULL,1,'2024-10-25 01:50:40',NULL);
/*!40000 ALTER TABLE `ec_brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_orders`
--

DROP TABLE IF EXISTS `ec_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `payment_method_id` bigint unsigned NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_shipping_fee` bigint NOT NULL DEFAULT '0',
  `payment_status` enum('pending','completed','refunding','refunded','fraud','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `status` enum('pending','processing','completed','canceled','returned') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `coupon_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(16,2) NOT NULL COMMENT 'Tổng tiền hàng',
  `shipping_amount` decimal(16,2) NOT NULL COMMENT 'Tiền ship',
  `tax_amount` decimal(16,2) NOT NULL COMMENT 'tiền thuế',
  `discount_amount` decimal(16,2) NOT NULL COMMENT 'Tiền giảm giá',
  `sub_total` decimal(16,2) NOT NULL COMMENT 'Tổng tiền',
  `completed_at` datetime DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `supplier_id` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_orders_code_unique` (`code`),
  KEY `ec_orders_user_id_foreign` (`user_id`),
  KEY `ec_orders_payment_method_id_foreign` (`payment_method_id`),
  CONSTRAINT `ec_orders_payment_method_id_foreign` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`),
  CONSTRAINT `ec_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_orders`
--

LOCK TABLES `ec_orders` WRITE;
/*!40000 ALTER TABLE `ec_orders` DISABLE KEYS */;
INSERT INTO `ec_orders` VALUES (6,6,1,'OD6BQzSyDk',0,'pending','pending',NULL,200000.00,0.00,0.00,0.00,200000.00,NULL,NULL,NULL,NULL,0),(7,4,1,'ODlilEo2YY',0,'pending','pending',NULL,340000.00,0.00,0.00,0.00,340000.00,NULL,NULL,NULL,NULL,0),(8,9,1,'ODevL1SVMI',0,'pending','pending',NULL,4050000.00,0.00,0.00,0.00,4050000.00,NULL,NULL,NULL,NULL,0),(11,10,1,'ODlV5sCoQK',0,'pending','pending',NULL,900000.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0),(12,12,1,'ODoz1pvwOG',111111,'pending','pending',NULL,351111.00,111111.00,0.00,0.00,0.00,NULL,NULL,'2024-11-16 07:45:48',NULL,0),(13,12,1,'ODEaZoAI90',122222,'pending','pending',NULL,0.00,122222.00,0.00,0.00,0.00,NULL,NULL,'2024-11-17 10:37:48',NULL,0);
/*!40000 ALTER TABLE `ec_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_labels`
--

DROP TABLE IF EXISTS `ec_product_labels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_labels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint NOT NULL DEFAULT '0',
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_labels`
--

LOCK TABLES `ec_product_labels` WRITE;
/*!40000 ALTER TABLE `ec_product_labels` DISABLE KEYS */;
INSERT INTO `ec_product_labels` VALUES (1,'New','Sản phẩm mới','new',0,'published','2024-10-20 03:47:11',NULL),(2,'Hot','Sản phẩm nổi bật','hot',0,'pending','2024-10-20 03:47:11',NULL),(3,'Sale','Sản phẩm khuyến mãi 2','sale',0,'published',NULL,NULL);
/*!40000 ALTER TABLE `ec_product_labels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_options`
--

DROP TABLE IF EXISTS `ec_product_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint NOT NULL DEFAULT '0',
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_options`
--

LOCK TABLES `ec_product_options` WRITE;
/*!40000 ALTER TABLE `ec_product_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_options_values`
--

DROP TABLE IF EXISTS `ec_product_options_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_options_values` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_option_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_product_options_values_product_option_id_foreign` (`product_option_id`),
  CONSTRAINT `ec_product_options_values_product_option_id_foreign` FOREIGN KEY (`product_option_id`) REFERENCES `ec_product_options` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_options_values`
--

LOCK TABLES `ec_product_options_values` WRITE;
/*!40000 ALTER TABLE `ec_product_options_values` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_options_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_products`
--

DROP TABLE IF EXISTS `ec_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `number` int NOT NULL DEFAULT '0',
  `price` int NOT NULL DEFAULT '0',
  `sale` int NOT NULL DEFAULT '0',
  `contents` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `length` double(8,2) DEFAULT NULL,
  `width` double(8,2) DEFAULT NULL,
  `height` double(8,2) DEFAULT NULL,
  `category_id` bigint unsigned NOT NULL,
  `brand_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `images` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_products_category_id_foreign` (`category_id`),
  KEY `ec_products_brand_id_foreign` (`brand_id`),
  CONSTRAINT `ec_products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `ec_brands` (`id`),
  CONSTRAINT `ec_products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_products`
--

LOCK TABLES `ec_products` WRITE;
/*!40000 ALTER TABLE `ec_products` DISABLE KEYS */;
INSERT INTO `ec_products` VALUES (1,'Dầu dưỡng xả Dove','dau-duong-xa-dove',NULL,'http://localhost:3014/uploads/images/e330475a-9145-47ef-989a-ffdd05c0dbc3.jpg','pending',20,200000,0,NULL,NULL,NULL,NULL,5,NULL,'2024-10-20 03:47:11',NULL,'[]'),(7,'BROSH X FUSTY WORKS POMADE','brosh-x-fusty-works-pomade',NULL,'http://localhost:3014/uploads/images/053324ee-52ca-4256-8248-67723603a60b.jpeg','pending',0,340000,0,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,'[]'),(8,'BROSH CLAY FIBER POMADE (mini)','brosh-clay-fiber-pomade-mini',NULL,'http://localhost:3014/uploads/images/52af08f6-35ba-4587-b6e6-3e1619d43b1a.jpg','pending',0,450000,0,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,'[]'),(9,'Tinh dầu dưỡng tóc ATS For man Styling Oil 80ml','tinh-dau-duong-toc-ats-for-man-styling-oil-80ml',NULL,'http://localhost:3014/uploads/images/4d7e4e3b-45d8-44a9-a38f-59a3deb1cd6e.png','pending',200,650000,0,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,'[]'),(10,'Tinh chất nuôi dưỡng chăm sóc tóc khô và hư tổn UNOVE SILK OIL ESSENCE 70ml','tinh-chat-nuoi-duong-cham-soc-toc-kho-va-hu-ton-unove-silk-oil-essence-70ml',NULL,'http://localhost:3014/uploads/images/537c1978-7e92-42af-ba3d-f99bd8037138.jpg','pending',10,250000,0,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL),(11,'Mặt nạ phục hồi tóc Laborie Derma Molecular Repair Hair Mask','mat-na-phuc-hoi-toc-laborie-derma-molecular-repair-hair-mask',NULL,'http://localhost:3014/uploads/images/535b24fd-6e20-4373-b8a2-440e3473bb91.jpg','pending',100,450000,0,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,'[]'),(12,'Tinh dầu dưỡng tóc Arren Men\'s Grooming 100ml','tinh-dau-duong-toc-arren-mens-grooming-100ml',NULL,'http://localhost:3014/uploads/images/389ddfa8-5c8f-448c-9e80-76fe6b8269f3.jpg','pending',10,450000,0,NULL,NULL,NULL,NULL,5,NULL,NULL,NULL,'[]'),(13,'Tinh dầu dưỡng tóc ATS For man Styling Oil 80ml','tinh-dau-duong-toc-ats-for-man-styling-oil-80ml',NULL,'http://localhost:3014/uploads/images/a26592e2-ff7c-411f-a77b-709ca706cad8.jpg','pending',100,560000,0,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL),(14,'Dầu gội cho da đầu nhạy cảm và rụng tóc Laborie Derma Scalp Shampoo 250ml','dau-goi-cho-da-dau-nhay-cam-va-rung-toc-laborie-derma-scalp-shampoo-250ml',NULL,'http://localhost:3014/uploads/images/34a74fd6-743f-429b-b374-a17fd2411f36.jpg','pending',100,900000,0,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL),(16,'Dầu xả Blairsom Thảo Mộc Phục Hồi 500ml','dau-xa-blairsom-thao-moc-phuc-hoi-500ml','<p>Dầu xả Blairsom Thảo Mộc Phục Hồi 500ml</p>','http://localhost:3014/uploads/images/fd92cbd0-6832-47ea-bb1a-95a92d79f2e7.jpg','pending',100,560000,0,NULL,NULL,NULL,NULL,10,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `ec_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_products_labels`
--

DROP TABLE IF EXISTS `ec_products_labels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_products_labels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `product_label_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_products_labels_product_id_foreign` (`product_id`),
  KEY `ec_products_labels_product_label_id_foreign` (`product_label_id`),
  CONSTRAINT `ec_products_labels_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ec_products_labels_product_label_id_foreign` FOREIGN KEY (`product_label_id`) REFERENCES `ec_product_labels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_products_labels`
--

LOCK TABLES `ec_products_labels` WRITE;
/*!40000 ALTER TABLE `ec_products_labels` DISABLE KEYS */;
INSERT INTO `ec_products_labels` VALUES (34,10,1,NULL,NULL),(35,10,2,NULL,NULL),(38,12,1,NULL,NULL),(42,16,1,NULL,NULL),(46,11,1,NULL,NULL),(47,11,3,NULL,NULL),(49,1,1,NULL,NULL),(50,7,1,NULL,NULL),(51,8,1,NULL,NULL),(52,8,3,NULL,NULL),(53,8,2,NULL,NULL),(54,9,1,NULL,NULL);
/*!40000 ALTER TABLE `ec_products_labels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_stock_ins`
--

DROP TABLE IF EXISTS `ec_stock_ins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_stock_ins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int NOT NULL,
  `price` int DEFAULT '0',
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'final: Kho thành phẩm      ingredient: kho nguyên liệu   ',
  PRIMARY KEY (`id`),
  KEY `ec_stock_ins_product_id_foreign` (`product_id`),
  CONSTRAINT `ec_stock_ins_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_stock_ins`
--

LOCK TABLES `ec_stock_ins` WRITE;
/*!40000 ALTER TABLE `ec_stock_ins` DISABLE KEYS */;
INSERT INTO `ec_stock_ins` VALUES (1,1,10,10000,'2024-10-28','2024-10-28 09:18:40','2024-10-28 09:18:40',NULL),(2,1,30,30000,'2024-10-28','2024-10-28 09:32:56','2024-10-28 09:32:56',NULL);
/*!40000 ALTER TABLE `ec_stock_ins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_stock_outs`
--

DROP TABLE IF EXISTS `ec_stock_outs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_stock_outs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int NOT NULL,
  `price` int DEFAULT '0',
  `user_id` bigint unsigned NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'final: Kho thành phẩm      ingredient: kho nguyên liệu   ',
  `order_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_stock_outs_product_id_foreign` (`product_id`),
  KEY `ec_stock_outs_user_id_foreign` (`user_id`),
  CONSTRAINT `ec_stock_outs_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ec_stock_outs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_stock_outs`
--

LOCK TABLES `ec_stock_outs` WRITE;
/*!40000 ALTER TABLE `ec_stock_outs` DISABLE KEYS */;
INSERT INTO `ec_stock_outs` VALUES (1,1,2,20000,1,'2024-10-28','2024-10-28 09:18:57','2024-10-28 09:18:57',NULL,0),(2,1,3,20000,1,'2024-10-28','2024-10-28 09:32:08','2024-10-28 09:32:08',NULL,0);
/*!40000 ALTER TABLE `ec_stock_outs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_transactions`
--

DROP TABLE IF EXISTS `ec_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `qty` int NOT NULL DEFAULT '1',
  `price` bigint NOT NULL DEFAULT '0',
  `total_price` bigint NOT NULL DEFAULT '0',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_transactions_order_id_foreign` (`order_id`),
  KEY `ec_transactions_product_id_foreign` (`product_id`),
  CONSTRAINT `ec_transactions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `ec_orders` (`id`),
  CONSTRAINT `ec_transactions_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_transactions`
--

LOCK TABLES `ec_transactions` WRITE;
/*!40000 ALTER TABLE `ec_transactions` DISABLE KEYS */;
INSERT INTO `ec_transactions` VALUES (8,6,1,1,200000,200000,'pending',NULL,NULL),(9,7,7,1,340000,340000,'pending',NULL,NULL),(17,11,11,1,450000,450000,'pending',NULL,NULL),(18,11,8,1,450000,450000,'pending',NULL,NULL),(27,13,7,1,340000,340000,'pending',NULL,NULL),(28,13,9,1,650000,650000,'pending',NULL,NULL),(29,12,7,1,340000,340000,'pending',NULL,NULL);
/*!40000 ALTER TABLE `ec_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (33,'2014_10_12_000000_create_users_table',1),(34,'2014_10_12_100000_create_password_reset_tokens_table',1),(35,'2019_08_19_000000_create_failed_jobs_table',1),(36,'2019_12_14_000001_create_personal_access_tokens_table',1),(37,'2024_08_24_073329_create_products_table',1),(38,'2024_09_29_001703_create_permission_tables',1),(39,'2024_10_13_163624_create_csdl_base_module_admin',1),(40,'2024_10_15_155633_create_csdl_blogs_module_admin',1),(41,'2024_11_01_045329_create_supplier',2),(42,'2024_11_02_082440_alter_add_column_order_id',2),(43,'2024_11_07_164654_create_services_table',2),(46,'2024_11_13_041229_create_services_user_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VND',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `config` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'VND','COD',NULL,'Nhận hàng thanh toán',1,'active',NULL,'2024-10-20 03:47:11',NULL);
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'MyApp','e88cb3d3fe9007e3e07a4e0691fe2b9febe38a4904b09cee57e12d61df341204','[\"*\"]','2024-10-27 05:54:58',NULL,'2024-10-24 23:58:56','2024-10-27 05:54:58'),(2,'App\\Models\\User',1,'MyApp','40582587078b7bba038b6a1ed450ba40d95b0b890dc8d80f1bb1fad33c591fbb','[\"*\"]','2024-11-02 05:08:09',NULL,'2024-10-25 21:25:40','2024-11-02 05:08:09');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_variants_product_id_foreign` (`product_id`),
  CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_home_service` tinyint(1) NOT NULL DEFAULT '0',
  `price` int NOT NULL DEFAULT '0',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Dịch vụ bảo hành',NULL,1,10000,'<p>Dịch vụ bảo hành</p>',NULL,NULL),(2,'Dịch vụ 10 bước gội đầu',NULL,0,100000,'<p>Dịch vụ 10 bước gội đầu</p>',NULL,NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_user`
--

DROP TABLE IF EXISTS `services_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `status` enum('pending','processing','completed','canceled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `is_home_service` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `services_user_user_id_index` (`user_id`),
  KEY `services_user_service_id_index` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_user`
--

LOCK TABLES `services_user` WRITE;
/*!40000 ALTER TABLE `services_user` DISABLE KEYS */;
INSERT INTO `services_user` VALUES (1,9,1,10000,'pending','Dịch vụ bảo hành',NULL,NULL,0,NULL,NULL),(2,10,2,100000,'pending','Dịch vụ 10 bước gội đầu',NULL,NULL,0,NULL,NULL),(3,12,1,10000,'pending','Dịch vụ bảo hành',NULL,NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `services_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slides`
--

DROP TABLE IF EXISTS `slides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slides` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` tinyint NOT NULL DEFAULT '1',
  `page` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'home',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slides`
--

LOCK TABLES `slides` WRITE;
/*!40000 ALTER TABLE `slides` DISABLE KEYS */;
INSERT INTO `slides` VALUES (9,'Sản phẩm thông minh','Bộ sưu tập ưu đãi mùa đông 2024',1,'home','https://123code.net','http://localhost:3014/uploads/images/3ba03011-5a90-4c96-b74c-f9aca5590c20.jpg','pending','2024-10-25 02:41:41',NULL),(10,'MCN','Bộ sưu tập ưu đãi mùa đông 2024',1,'home','https://123code.net','http://localhost:3014/uploads/images/049f7e00-c3bc-4b9b-a0a2-019f7ad404af.jpg','pending','2024-10-25 02:41:41',NULL);
/*!40000 ALTER TABLE `slides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_type` enum('USER','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ADMIN','admin@gmail.com',NULL,'$2y$12$w5.p9RDFwrnZJ0LMJEgdJuzSM8R3LajfSxiVGUWkbjyHFkqcW7p8W','0986420994',NULL,NULL,1,'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg',NULL,'2024-10-20 03:47:10','2024-10-20 03:47:10','ADMIN'),(4,'Hạ Linh','codethue9402@gmail.com',NULL,'$2a$10$tai56eo5T0CB1DY9uywD1OQjN7H2/k26Ba0sJuPbamNpUA.B8MSY.','0986787625',NULL,NULL,1,'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg',NULL,NULL,NULL,'USER'),(6,'Bích ngọc','admin2@gmail.com',NULL,'$2a$10$XdpPkBpM6tZTMWghviq7vOzzrNSkNc8pHa19xZt38eWxmzQ.E13I6','0986420994',NULL,NULL,1,NULL,NULL,NULL,NULL,'USER'),(7,'Nhã An','phuphandata@gmail.com',NULL,'$2a$10$urkwF3Ax7M6NzPqyjBV47enG0WHwuvCIywv.qp5R1Zz2rtHXCVXf6','0978656212',NULL,NULL,1,'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg',NULL,NULL,NULL,'USER'),(9,'Phú PT','phupt.humg.94@gmail.com',NULL,'$2a$10$N9dTqUb0jYYxhmICY1f/FODdIKYUvkT71cpt/8CE1AoLsQywflsCa','0987676222',NULL,NULL,1,'http://localhost:3014/uploads/images/46973176-09b2-4642-bf00-de0d995408cd.jpg',NULL,NULL,NULL,'USER'),(10,'ngoc na','ngoc@gmail.com',NULL,'$2a$10$KLfvLksRuqlrLkuAh/EjeO6uqFtFtzWntsyc.PZJSqlG22fxGCZVq',NULL,NULL,NULL,1,'http://localhost:3014/uploads/images/c20534bf-8090-40ac-841e-e85c3ca3aa16.jpg',NULL,NULL,NULL,'USER'),(11,'letrinhxuan','letrinhxuan@gmail.com',NULL,'$2a$10$bLPUPfgErXseoS3iAvmZkueOWgD0IP2ozk9tBtUiFTcL7i7gb/A4q',NULL,NULL,NULL,1,'https://via.placeholder.com/150',NULL,NULL,NULL,'USER'),(12,'Huy','Hudony00800@gmail.com',NULL,'$2a$10$YVUHngnBwzusiLPdMCpOHezINDZDcPgVnKGHXNIhGhVcHYi0w5kZ.',NULL,NULL,NULL,1,'https://via.placeholder.com/150',NULL,NULL,NULL,'ADMIN'),(13,'Huy khac','Hudony008010@gmail.com',NULL,'$2a$10$suO75ABrlaH1X/8qQqmFk.Q8MNFjixBhUA.HK5Z998HW2s3TCscGK',NULL,NULL,NULL,1,'https://via.placeholder.com/150',NULL,NULL,NULL,NULL),(14,'Huy','vietfarmers1235@gmail.com',NULL,'$2a$10$XRxW6EM/HwRP0JBr85GHUuCxDB.WjRRfgwE6cfbVRfMR1iG5FwZ9e','00001231231',NULL,NULL,1,'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg',NULL,NULL,NULL,'ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_bank_accounts`
--

DROP TABLE IF EXISTS `users_bank_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_bank_accounts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `bank_id` bigint unsigned NOT NULL,
  `account_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_branch` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_bank_accounts_user_id_foreign` (`user_id`),
  KEY `users_bank_accounts_bank_id_foreign` (`bank_id`),
  CONSTRAINT `users_bank_accounts_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_bank_accounts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_bank_accounts`
--

LOCK TABLES `users_bank_accounts` WRITE;
/*!40000 ALTER TABLE `users_bank_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_bank_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_has_types`
--

DROP TABLE IF EXISTS `users_has_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_has_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `user_type_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_has_types_user_id_foreign` (`user_id`),
  KEY `users_has_types_user_type_id_foreign` (`user_type_id`),
  CONSTRAINT `users_has_types_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_has_types_user_type_id_foreign` FOREIGN KEY (`user_type_id`) REFERENCES `users_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_types`
--

LOCK TABLES `users_has_types` WRITE;
/*!40000 ALTER TABLE `users_has_types` DISABLE KEYS */;
INSERT INTO `users_has_types` VALUES (1,1,2,NULL,NULL),(2,1,1,NULL,NULL);
/*!40000 ALTER TABLE `users_has_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_types`
--

DROP TABLE IF EXISTS `users_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_types_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_types`
--

LOCK TABLES `users_types` WRITE;
/*!40000 ALTER TABLE `users_types` DISABLE KEYS */;
INSERT INTO `users_types` VALUES (1,'ADMIN','2024-10-20 03:47:09','2024-10-20 03:47:09'),(2,'USER','2024-10-20 03:47:09','2024-10-20 03:47:09'),(3,'SYSTEM','2024-10-20 03:47:09','2024-10-20 03:47:09');
/*!40000 ALTER TABLE `users_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_wallets`
--

DROP TABLE IF EXISTS `users_wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_wallets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `balance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_wallets_user_id_foreign` (`user_id`),
  CONSTRAINT `users_wallets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_wallets`
--

LOCK TABLES `users_wallets` WRITE;
/*!40000 ALTER TABLE `users_wallets` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_wallets_transactions`
--

DROP TABLE IF EXISTS `users_wallets_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_wallets_transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `wallet_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `type` enum('credit','debit') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','paid','reject','cancel') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_wallets_transactions_wallet_id_foreign` (`wallet_id`),
  KEY `users_wallets_transactions_user_id_foreign` (`user_id`),
  CONSTRAINT `users_wallets_transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_wallets_transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `users_wallets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_wallets_transactions`
--

LOCK TABLES `users_wallets_transactions` WRITE;
/*!40000 ALTER TABLE `users_wallets_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_wallets_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant_attributes`
--

DROP TABLE IF EXISTS `variant_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant_attributes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `variant_id` bigint unsigned NOT NULL,
  `attribute_value_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `variant_attributes_variant_id_foreign` (`variant_id`),
  KEY `variant_attributes_attribute_value_id_foreign` (`attribute_value_id`),
  CONSTRAINT `variant_attributes_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `ec_attribute_values` (`id`) ON DELETE CASCADE,
  CONSTRAINT `variant_attributes_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant_attributes`
--

LOCK TABLES `variant_attributes` WRITE;
/*!40000 ALTER TABLE `variant_attributes` DISABLE KEYS */;
/*!40000 ALTER TABLE `variant_attributes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-30 20:30:27
