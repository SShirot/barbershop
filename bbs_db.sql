-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bbs_db
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
INSERT INTO `acl_permissions` VALUES (1,'all','api','all','Toàn quyền','2024-11-22 00:26:19','2024-11-22 00:26:19'),(2,'product_index','api','product_index','Danh sách sản phẩm','2024-11-22 00:26:19','2024-11-22 00:26:19');
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
INSERT INTO `acl_roles` VALUES (1,'administrator','api','Toàn quyền','2024-11-22 00:26:19','2024-11-22 00:26:19'),(2,'manage','api','Quản lý','2024-11-22 00:26:19','2024-11-22 00:26:19'),(3,'general_director','api','Tổng giám đốc','2024-11-22 00:26:19','2024-11-22 00:26:19'),(4,'staff','api','Nhân viên','2024-11-22 00:26:19','2024-11-22 00:26:19');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bl_articles`
--

LOCK TABLES `bl_articles` WRITE;
/*!40000 ALTER TABLE `bl_articles` DISABLE KEYS */;
INSERT INTO `bl_articles` VALUES (1,'Tên bài viết','ten-bai-viet','Tên bài viết','<p>Nội dung bài viết</p><p>Tôi đang viết update sau</p>','published',NULL,1,1,'http://localhost:3014/uploads/images/b912ad47-31fe-4a3f-adce-a99b4800c557.jpg',0,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bl_articles_tags`
--

LOCK TABLES `bl_articles_tags` WRITE;
/*!40000 ALTER TABLE `bl_articles_tags` DISABLE KEYS */;
INSERT INTO `bl_articles_tags` VALUES (1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bl_menus`
--

LOCK TABLES `bl_menus` WRITE;
/*!40000 ALTER TABLE `bl_menus` DISABLE KEYS */;
INSERT INTO `bl_menus` VALUES (1,'Tin khuyến mãi','tin-khuyen-mai','Tin khuyến mãi','pending',1,NULL,NULL),(2,'Kinh nghiệm mua sắm','kinh-nghiem-mua-sam','Kinh nghiệm mua sắm','pending',1,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bl_tags`
--

LOCK TABLES `bl_tags` WRITE;
/*!40000 ALTER TABLE `bl_tags` DISABLE KEYS */;
INSERT INTO `bl_tags` VALUES (1,'Bán hàng','ban-hang','Bán hàng','pending',1,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sáp Vuốt Tóc','sap-vuot-toc',NULL,NULL,'pending','Sáp vuốt tóc nam giới',0,NULL,NULL,NULL,1,'2024-11-21 17:26:18',NULL),(2,'Dầu Dưỡng Tóc','dau-duong-toc',NULL,NULL,'pending','dầu dưỡng cung cấp độ ẩm và các dưỡng chất cho tóc phục hồi nhanh chóng',0,NULL,NULL,NULL,1,NULL,NULL),(8,'Dầu gội','dau-goi',NULL,NULL,'pending','dầu gội\n',0,NULL,NULL,NULL,1,NULL,NULL),(9,'Dầu xả','dau-xa',NULL,NULL,'pending','dầu xả tóc giúp tóc phục hồi hư tổn nhanh chóng\n',0,NULL,NULL,NULL,1,NULL,NULL),(10,'Gôm xịt','gom-xit',NULL,NULL,'pending','Gôm xịt tạo kiểu cho tóc',0,NULL,NULL,NULL,1,NULL,NULL),(11,'Lược tạo kiểu','luoc-tao-kieu',NULL,NULL,'pending','Lược tạo kiểu giúp dễ dàng tạo kiểu tóc trong lúc sấy',0,NULL,NULL,NULL,1,NULL,NULL),(12,'Mặt nạ tóc','mat-na-toc',NULL,NULL,'pending','serum dưỡng ẩm giúp tránh hư tổn phục hồi nhanh',0,NULL,NULL,NULL,1,NULL,NULL),(13,'Prestyling','prestyling',NULL,NULL,'pending','Sản phẩm tạo kiểu sử dụng trước khi sấy tạo kiểu giúp tóc dễ dàng hơn trong việc tạo kiểu',0,NULL,NULL,NULL,1,NULL,NULL),(14,'Thuốc tạo kiểu','thuoc-tao-kieu',NULL,NULL,'pending','Thuốc ép side, thuốc uốn tóc, thuốc nhuộm...',0,NULL,NULL,NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_agencies`
--

DROP TABLE IF EXISTS `ec_agencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_agencies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_agencies`
--

LOCK TABLES `ec_agencies` WRITE;
/*!40000 ALTER TABLE `ec_agencies` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_agencies` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_attribute_values`
--

LOCK TABLES `ec_attribute_values` WRITE;
/*!40000 ALTER TABLE `ec_attribute_values` DISABLE KEYS */;
INSERT INTO `ec_attribute_values` VALUES (21,1,1,'#e52424',NULL,'M','m','2024-11-23 14:14:12','2024-11-23 14:14:12'),(22,1,0,'#a86767',NULL,'L','l','2024-11-23 14:14:12','2024-11-23 14:14:12'),(23,1,0,'#6b4343',NULL,'X','x','2024-11-23 14:14:12','2024-11-23 14:14:12'),(24,1,0,'#4b3f3f',NULL,'XS','xs','2024-11-23 14:14:12','2024-11-23 14:14:12'),(25,5,1,'#1475db',NULL,'Xanh','xanh','2024-11-23 14:21:02','2024-11-23 14:21:02'),(26,5,0,'#f00000',NULL,'Đỏ','đỏ','2024-11-23 14:21:02','2024-11-23 14:21:02'),(27,13,1,'#000000',NULL,'2GB','2gb','2024-11-23 14:23:05','2024-11-23 14:23:05');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_attributes`
--

LOCK TABLES `ec_attributes` WRITE;
/*!40000 ALTER TABLE `ec_attributes` DISABLE KEYS */;
INSERT INTO `ec_attributes` VALUES (1,'Size','size',0,0,0,'pending','2024-11-22 09:43:52','2024-11-23 14:14:12'),(5,'Color','color',0,0,0,'pending','2024-11-23 14:17:52','2024-11-23 14:21:02'),(13,'RAM','ram',0,0,0,'pending','2024-11-23 14:21:15','2024-11-23 14:23:05');
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_brands`
--

LOCK TABLES `ec_brands` WRITE;
/*!40000 ALTER TABLE `ec_brands` DISABLE KEYS */;
INSERT INTO `ec_brands` VALUES (1,'VOLCANIC','volcanic',NULL,'pending','tạo kiểu tóc',NULL,NULL,NULL,1,'2024-11-21 17:26:18',NULL),(2,'BROSH','brosh',NULL,'pending','sáp',NULL,NULL,NULL,1,'2024-12-07 04:23:19',NULL),(3,'TRESemmé','tresemme',NULL,'pending','sản phẩm chăm sóc tóc',NULL,NULL,NULL,1,'2024-12-07 04:30:18',NULL),(4,'L\'Oréal','loreal',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:10:48',NULL),(5,'Milaganics','milaganics',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:11:26',NULL),(6,'Double Rich','double-rich',NULL,'pending','dầu dưỡng',NULL,NULL,NULL,1,'2025-02-27 07:11:47',NULL),(7,'Raip','raip',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:11:58',NULL),(8,'Cocoon','cocoon',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:12:12',NULL),(9,'Megumi','megumi',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:12:21',NULL),(10,'Menitems','menitems',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:12:28',NULL),(11,'Gennie','gennie',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:12:36',NULL),(12,'Tsubaki','tsubaki',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:12:44',NULL),(13,'Selsun','selsun',NULL,'pending','dầu gội',NULL,NULL,NULL,1,'2025-02-27 07:13:06',NULL),(14,'Tsubaki','tsubaki',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:13:17',NULL),(15,'OGX','ogx',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:13:52',NULL),(16,'Nguyên Xuân','nguyen-xuan',NULL,'pending','dầu gội dược liệu',NULL,NULL,NULL,1,'2025-02-27 07:14:27',NULL),(17,'Kumano Salon Link','kumano-salon-link',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:14:37',NULL),(18,'Clear','clear',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:14:51',NULL),(19,'Pantene','pantene',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:15:00',NULL),(20,'Dove','dove',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:15:11',NULL),(21,'Naris','naris',NULL,'pending','dầu xả',NULL,NULL,NULL,1,'2025-02-27 07:15:49',NULL),(22,'Diane','diane',NULL,'pending','dầu xả',NULL,NULL,NULL,1,'2025-02-27 07:15:58',NULL),(23,'Mise en scène','mise-en-scene',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:16:08',NULL),(24,'Evoluderm','evoluderm',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:16:20',NULL),(25,'Sunsilk','sunsilk',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:16:35',NULL),(26,'Dr.ForHair','drforhair',NULL,'pending','chăm sóc tóc',NULL,NULL,NULL,1,'2025-02-27 07:16:49',NULL),(27,'Roug Men\'s Grooming','roug-mens-grooming',NULL,'pending','tạo kiểu tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:18:54',NULL),(28,'LBZ Men\'s Grooming','lbz-mens-grooming',NULL,'pending','tạo kiểu tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:20:00',NULL),(29,'Butterfly Shadow','butterfly-shadow',NULL,'pending','gôm xịt',NULL,NULL,NULL,1,'2025-02-27 07:20:36',NULL),(30,' Luxurious','luxurious',NULL,'pending','tạo kiểu tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:21:10',NULL),(31,'Colmav','colmav',NULL,'pending','tạo kiểu tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:21:39',NULL),(32,'2Vee','2vee',NULL,'pending','tạo kiểu tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:22:14',NULL),(33,'1821 man made','1821-man-made',NULL,'pending','tạo kiểu tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:22:40',NULL),(34,'Kevin Murphy','kevin-murphy',NULL,'pending','tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:23:19',NULL),(35,'Glanzen','glanzen',NULL,'pending','tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:23:30',NULL),(36,'Men U','men-u',NULL,'pending','tạo kiểu tóc',NULL,NULL,NULL,1,'2025-02-27 07:23:49',NULL),(37,'Tigi','tigi',NULL,'pending','tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:24:09',NULL),(38,'Davines','davines',NULL,'pending','tạo kiểu tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:24:35',NULL),(39,'Suavecito','suavecito',NULL,'pending','tạo kiểu tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:24:43',NULL),(40,'Fanola','fanola',NULL,'pending','mặt nạ tóc',NULL,NULL,NULL,1,'2025-02-27 07:26:40',NULL),(41,'Kérastase','kerastase',NULL,'pending','ủ tóc',NULL,NULL,NULL,1,'2025-02-27 07:27:09',NULL),(42,'Vilain','vilain',NULL,'pending','tạo kiểu tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:27:59',NULL),(43,'Dapper Dan','dapper-dan',NULL,'pending','tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:28:29',NULL),(44,'Reuzel','reuzel',NULL,'pending','tóc nam\n',NULL,NULL,NULL,1,'2025-02-27 07:28:51',NULL),(45,'Forte Series','forte-series',NULL,'pending','tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:29:14',NULL),(46,'Bona Fide','bona-fide',NULL,'pending','tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:29:33',NULL),(47,'Prospectors','prospectors',NULL,'pending','tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:29:49',NULL),(48,'Apestomen','apestomen',NULL,'pending','tóc nam',NULL,NULL,NULL,1,'2025-02-27 07:30:08',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_orders`
--

LOCK TABLES `ec_orders` WRITE;
/*!40000 ALTER TABLE `ec_orders` DISABLE KEYS */;
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
INSERT INTO `ec_product_labels` VALUES (1,'New','New','new',0,'pending',NULL,NULL),(2,'Hot','Hot','hot',0,'pending',NULL,NULL),(3,'Sale','Sale','sale',0,'pending',NULL,NULL);
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
-- Table structure for table `ec_product_variants`
--

DROP TABLE IF EXISTS `ec_product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_variants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `sku` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_product_variants_product_id_foreign` (`product_id`),
  CONSTRAINT `ec_product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_variants`
--

LOCK TABLES `ec_product_variants` WRITE;
/*!40000 ALTER TABLE `ec_product_variants` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_variants` ENABLE KEYS */;
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
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `number` int NOT NULL DEFAULT '0',
  `price` int NOT NULL DEFAULT '0',
  `sale` int NOT NULL DEFAULT '0',
  `contents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `length` double(8,2) DEFAULT NULL,
  `width` double(8,2) DEFAULT NULL,
  `height` double(8,2) DEFAULT NULL,
  `category_id` bigint unsigned NOT NULL,
  `brand_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `total_vote_count` int NOT NULL DEFAULT '0',
  `total_rating_score` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ec_products_category_id_foreign` (`category_id`),
  KEY `ec_products_brand_id_foreign` (`brand_id`),
  CONSTRAINT `ec_products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `ec_brands` (`id`),
  CONSTRAINT `ec_products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_products`
--

LOCK TABLES `ec_products` WRITE;
/*!40000 ALTER TABLE `ec_products` DISABLE KEYS */;
INSERT INTO `ec_products` VALUES (26,'Tinh Chất Mọc Tóc L\'Oréal Professionnel Dạng Xịt 90ml (Mới)','tinh-chat-moc-toc-loreal-professionnel-dang-xit-90ml-moi','<p><strong style=\"color: rgb(0, 0, 0);\">Tinh chất mọc tóc L\'Oréal Professionnel Serioxyl Advanced 90ml</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;là sản phẩm&nbsp;</span>serum dưỡng tóc đến từ thương hiệu chăm sóc tóc chuyên nghiệp L\'Oreal Professionnel<span style=\"color: rgb(0, 0, 0);\">&nbsp;với công thức chứa 5% Stemoxydine và Resveratrol giúp duy trì hoạt động thích hợp của tế bào gốc và tối ưu hóa chu kỳ tóc, từ đó cải thiện chu trình nang tóc thay mới, giúp làm tăng mật độ tóc. Tóc dày hơn chỉ sau 6 tuần sử dụng*.</span></p>','http://localhost:3014/uploads/images/1faaa4bf-bc08-4268-b3fd-c49f13948005.jpg','published',100,1148000,0,NULL,NULL,NULL,NULL,2,2,NULL,NULL,0,0),(27,'Dầu Dưỡng Tóc L\'Oreal Tinh Dầu Hoa Tự Nhiên 100ml','dau-duong-toc-loreal-tinh-dau-hoa-tu-nhien-100ml','<p><strong style=\"color: rgb(0, 0, 0);\">Dầu Dưỡng Chiết Xuất Tinh Dầu Hoa Tự Nhiên L\'Oreal Paris Elseve Extraodinary Oil</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;là sản phẩm</span><strong style=\"color: rgb(0, 0, 0);\"> </strong><strong>dầu dưỡng tóc</strong><strong style=\"color: rgb(0, 0, 0);\">&nbsp;</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;đến từ</span><strong style=\"color: rgb(0, 0, 0);\"> </strong><strong>thương hiệu mỹ phẩm L\'Oreal Paris </strong><span style=\"color: rgb(0, 0, 0);\">của Pháp,&nbsp;với thành phần được&nbsp;chiết xuất từ 6 loại hoa thiên nhiên&nbsp;giúp nuôi dưỡng mái tóc từ sâu bên trong, cho tóc suôn mượt, mềm mại, chắc khỏe.&nbsp;Sản phẩm có hương thơm dịu nhẹ của các loài hoa thiên nhiên sẽ tạo cho bạn cảm giác thư giãn. Thành phần an toàn, không gây kích ứng da đầu.</span></p>','http://localhost:3014/uploads/images/96125010-d99b-43f9-82fe-c17742a3cf52.jpg','pending',100,182000,0,NULL,NULL,NULL,NULL,2,2,NULL,NULL,0,0),(28,'Serum Dưỡng Tóc TRESemmé Vào Nếp Suôn Mượt 100ml (Mới)','serum-duong-toc-tresemme-vao-nep-suon-muot-100ml-moi','<h2><strong>Serum Dưỡng Tóc TRESemmé Keratin Smooth KeratinBond+ Serum Vào Nếp Suôn Mượt 100ml (Mới)</strong></h2><p>Serum Dưỡng Tóc TRESemmé Keratin Smooth KeratinBond+ Serum Vào Nếp Suôn Mượt 100ml (Mới) với công nghệ tiên tiến nó giúp sửa chữa các liên kết bị đứt do chải, gội và thậm chí là tạo kiểu. Serum thấm sâu vào 10 lớp sợi tóc* với công thức không nhờn , và bảo vệ khỏi hư tổn do tạo kiểu.</p><h3><strong>Ưu thế nổi bật:</strong></h3><ul><li>Công thức không gây bết dính, giúp thấm sâu qua 10 lớp biểu bì tóc* và bảo vệ tóc trước các hư tổn do tạo kiểu.</li><li><br></li><li>Cải thiện khả năng vào nếp của tóc, cho tóc vào nếp suôn mượt chuẩn salon suốt ngày dài.</li><li><br></li><li>Công thức chuẩn KeratinBond+ giúp phục hồi các liên kết tóc bị đứt gãy do chải, gội &amp; tác động mạnh, cho tóc vào nếp suôn mượt suốt ngày dài.</li><li><br></li><li>0% parabens, 0 chất tạo màu.</li><li><br></li><li>Phù hợp cho tóc nhuộm.</li></ul><h3><strong>Hiệu quả sử dụng:</strong></h3><ul><li>Tóc vào nếp suôn mượt như được phục hồi Keratin tại Salon.</li></ul>','http://localhost:3014/uploads/images/1ca86d41-8cc4-48e5-b9dc-e0324e935dc8.jpg','pending',111,169000,0,NULL,NULL,NULL,NULL,2,2,NULL,NULL,0,0),(29,'Nước Xịt Dưỡng Tóc Double Rich Cho Tóc Khô Xơ, Hư Tổn 250ml','nuoc-xit-duong-toc-double-rich-cho-toc-kho-xo-hu-ton-250ml','<p><strong style=\"color: rgb(0, 0, 0);\">Nước Dưỡng Tóc Double Rich Balancing Water Double Repair UV Protection</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;với công thức mới cải tiến giúp nuôi dưỡng cho mái tóc khô xơ, hư tổn trở nên mềm mượt. Hàm lượng amino acid và keratin trong sản phẩm sẽ giúp phục hồi các hư tổn, làm giảm tình trạng tóc khô xơ và gãy rụng hiệu quả, trả lại độ sáng bóng tự nhiên cho mái tóc. Ngoài ra, sản phẩm còn hỗ trợ bảo vệ mái tóc khỏi tác động của tia UV trong ánh nắng mặt trời.</span></p>','http://localhost:3014/uploads/images/dcb775f7-750f-4a8f-be1c-21fe00adf834.jpg','pending',100,55000,0,NULL,NULL,NULL,NULL,2,2,NULL,NULL,0,0),(30,'Dầu Dừa Milaganics Ép Lạnh Tinh Khiết 250ml','dau-dua-milaganics-ep-lanh-tinh-khiet-250ml','<p><strong>Dầu Dừa Ép Lạnh Tinh Khiết Milaganics</strong>&nbsp;là sản phẩm chứa dầu dừa tự nhiên 100% được chiết xuất hoàn toàn từ dừa Bến Tre đến từ <strong>thương hiệu Milaganics</strong><strong style=\"color: rgba(51, 34, 0, 0.067);\">&nbsp;</strong>. Sản phẩm&nbsp;có tác dụng dưỡng da, giảm tình trạng da khô, rạn, dưỡng môi mềm,.. và được dùng như một loại&nbsp;dầu dưỡng tóc&nbsp;hữu hiệu, giúp cung cấp độ ẩm, cho mái tóc mềm mượt, óng ả.&nbsp;</p><p><br></p>','http://localhost:3014/uploads/images/d90ecd93-ec9e-4860-ba75-db4fb37fb2f3.jpg','pending',100,98000,0,NULL,NULL,NULL,NULL,2,2,NULL,NULL,0,0),(31,'Nước Xịt Dưỡng Tóc Double Rich Chuyên Sâu Cho Tóc Nhuộm 250ml','nuoc-xit-duong-toc-double-rich-chuyen-sau-cho-toc-nhuom-250ml','<p><strong style=\"color: rgb(0, 0, 0);\">Nước Dưỡng Tóc Double Rich Balancing Water Extra Double Repair Color Protection&nbsp;</strong><span style=\"color: rgb(0, 0, 0);\">với công thức mới cải tiến giúp chăm sóc tóc chuyên sâu dành cho mái tóc nhuộm / tóc hư tổn nặng do tác động của nhiệt độ cao hay hóa chất tạo kiểu. Sản phẩm giúp cung cấp độ ẩm và hàm lượng keratin thiết yếu để phục hồi hồi các hư tổn, mang lại mái tóc suôn mềm và óng mượt hơn, đồng thời hỗ trợ bảo vệ và duy trì màu tóc được bền đẹp lâu dài.</span></p>','http://localhost:3014/uploads/images/c09d4263-87f5-4b1a-971e-e195b739ddcf.jpg','pending',100,55000,0,NULL,NULL,NULL,NULL,2,2,NULL,NULL,0,0),(32,'Tinh Dầu Dưỡng Tóc Raip Bóng Mượt Hương Baby Powder 100ml','tinh-dau-duong-toc-raip-bong-muot-huong-baby-powder-100ml','<p><strong style=\"color: rgb(0, 0, 0);\">Tinh Dầu Dưỡng Tóc Raip R3 Argan Hair Oil 100ml</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;là sản phẩm </span><strong>dưỡng tóc </strong><span style=\"color: rgb(0, 0, 0);\">đến từ </span><strong>thương hiệu chăm sóc tóc Raip</strong> <span style=\"color: rgb(0, 0, 0);\">của Hàn Quốc,&nbsp;chiết xuất từ những thành phần giàu dưỡng chất như&nbsp;</span><strong style=\"color: rgb(0, 0, 0);\">dầu Argan, vitamin E, dầu hoa cúc, dầu oliu, dầu hạt hướng dương…</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;mang lại hiệu quả chăm sóc tóc vượt trội, cho bạn mái tóc mềm mại, suôn mượt bất ngờ đồng thời ngăn ngừa tình trạng tóc xơ rối, chẻ ngọn và gãy rụng. Sản phẩm mang đến 5 loại mùi hương và đậm phong cách riêng, với vô vàng sự kết hợp đa sắc hương thú vị để mái tóc của bạn tạo nên phong cách, cá tính riêng của chính mình.</span></p>','http://localhost:3014/uploads/images/80da61db-865a-4c4f-89ed-80a65169fe04.jpg','pending',111,91000,0,NULL,NULL,NULL,NULL,2,7,NULL,NULL,0,0),(33,'Dầu Dưỡng Tóc L\'Oréal Professionnel Phục Hồi Hư Tổn 90ml','dau-duong-toc-loreal-professionnel-phuc-hoi-hu-ton-90ml','<p>Tinh dầu dưỡng tóc đa năng phục hồi hư tổn toàn diện 10 trong 1 L\'Oréal Professionnel Serie Expert Absolut Repair Gold là giải pháp hiệu quả cho mái tóc bị hư tổn nặng nề bởi hóa chất và các tác nhân gây hại khác. Sản phẩm bổ sung hàm lượng dưỡng chất Keratin liều cao giúp hồi sinh những sợi tóc xơ, khô. Cùng công nghệ Ionene G độc quyền của L\'Oréal với các hạt ion dương siêu nhỏ sẽ lấp đầy những lỗ hổng ione âm do hư tổn tạo thành trên tóc, sẽ mang lại sự chắc khỏe, mềm mại cho mái tóc của bạn.</p>','http://localhost:3014/uploads/images/73d5eb69-d92e-4894-abf3-55e930e0f8b1.jpg','pending',111,728000,0,NULL,NULL,NULL,NULL,2,4,NULL,NULL,0,0),(34,'Serum Bưởi Milaganics Ngăn Rụng & Kích Thích Mọc Tóc 100ml','serum-buoi-milaganics-ngan-rung-kich-thich-moc-toc-100ml','<p>Serum Bưởi Milaganics Nuôi Dưỡng, Kích Thích Mọc Tóc là dòng serum dưỡng tóc đến từ thương hiệu mỹ phẩm Milaganics của Việt Nam, với chiết xuất từ tinh dầu bưởi kết hợp cùng dầu dừa tinh khiết, vitamin E và nước tinh khiết nuôi dưỡng mái tóc dài óng khỏe, làm giảm tình trạng xơ rối, gãy rụng.</p>','http://localhost:3014/uploads/images/e5044fdc-5dd0-44fc-b09c-eced0211d250.jpg','pending',111,58000,0,NULL,NULL,NULL,NULL,2,5,NULL,NULL,0,0),(35,'Tinh Chất Dưỡng Tóc Cocoon Hỗ Trợ Phục Hồi & Bảo Vệ 70ml','tinh-chat-duong-toc-cocoon-ho-tro-phuc-hoi-bao-ve-70ml','<p>Serum Bưởi Milaganics Nuôi Dưỡng, Kích Thích Mọc Tóc là dòng serum dưỡng tóc đến từ thương hiệu mỹ phẩm Milaganics của Việt Nam, với chiết xuất từ tinh dầu bưởi kết hợp cùng dầu dừa tinh khiết, vitamin E và nước tinh khiết nuôi dưỡng mái tóc dài óng khỏe, làm giảm tình trạng xơ rối, gãy rụng.</p>','http://localhost:3014/uploads/images/12ac2e9e-004d-4e14-b07f-8bbc220ced98.jpg','pending',111,140000,0,NULL,NULL,NULL,NULL,2,8,NULL,NULL,0,0),(36,'Tinh Chất 50 Megumi Dưỡng Và Ngăn Rụng Tóc 30ml','tinh-chat-50-megumi-duong-va-ngan-rung-toc-30ml','<p><strong style=\"color: rgb(0, 0, 0);\">Tinh Chất 50 Megumi Dưỡng Và Ngăn Rụng Tóc</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;là&nbsp;sản phẩm </span>serum dưỡng tóc của 50 Megumi <span style=\"color: rgb(0, 0, 0);\">-&nbsp;thương hiệu&nbsp;chăm sóc tóc uy tín đến từ đất nước Nhật Bản.&nbsp;Tinh chất 50 Megumi với 50 thành phần dưỡng quý giá được chọn lọc kĩ lưỡng cùng công thức tác động kép sẽ cung cấp nguồn dinh dưỡng tối ưu cho da đầu,&nbsp;giúp nuôi dưỡng da đầu và chân tóc khỏe mạnh, từ đó giảm tình trạng rụng tóc.&nbsp;Công thức dịu nhẹ, không chứa Silicone và Sulfate,&nbsp;thích hợp cho da đầu yếu và tóc dễ rụng.</span></p>','http://localhost:3014/uploads/images/d58aab2b-a664-4b81-aeef-f0d4447813d6.jpg','pending',111,133000,0,NULL,NULL,NULL,NULL,2,9,NULL,NULL,0,0),(37,'Tinh Dầu Dưỡng Tóc Menitems Hương Nước Hoa 30ml','tinh-dau-duong-toc-menitems-huong-nuoc-hoa-30ml','<p>Tinh Dầu Dưỡng Tóc Menitems Hương Nước Hoa 30ml là sản phẩm tinh dầu dưỡng tóc đến từ thương hiệu dành cho nam giới Menitems của Việt Nam. Thành phần tinh dầu argan, dầu mù u, dầu ô liu giúp cung cấp dưỡng ẩm cho tóc, phục hồi hư tổn, giúp tóc chắc khoẻ, giảm tác hại từ môi trường bên ngoài, an toàn cho mọi loại tóc và không gây bết rít.</p>','http://localhost:3014/uploads/images/08d4c36c-7a9f-40a5-99dd-5ac91e862467.jpg','pending',111,120000,0,NULL,NULL,NULL,NULL,2,10,NULL,NULL,0,0),(38,'Dầu Dưỡng Tóc L\'Oréal Professionnel Phục Hồi Hư Tổn 30ml','dau-duong-toc-loreal-professionnel-phuc-hoi-hu-ton-30ml','<p>Tinh Dầu Dưỡng Tóc Menitems Hương Nước Hoa 30ml là sản phẩm tinh dầu dưỡng tóc đến từ thương hiệu dành cho nam giới Menitems của Việt Nam. Thành phần tinh dầu argan, dầu mù u, dầu ô liu giúp cung cấp dưỡng ẩm cho tóc, phục hồi hư tổn, giúp tóc chắc khoẻ, giảm tác hại từ môi trường bên ngoài, an toàn cho mọi loại tóc và không gây bết rít.</p>','http://localhost:3014/uploads/images/2a65544a-46a9-4145-b046-3e39eee2bee0.jpg','pending',111,360000,0,NULL,NULL,NULL,NULL,2,4,NULL,NULL,0,0),(39,'Tinh Dầu Bưởi Gennie Cho Tóc Gãy Rụng 30ml','tinh-dau-buoi-gennie-cho-toc-gay-rung-30ml','<p>Tinh Dầu Bưởi Gennie Cho Tóc Gãy Rụng 30ml là sản phẩm serum dưỡng tóc đến từ thương hiệu Gennie của Singapore, với tinh dầu vỏ bưởi 100% thiên nhiên kết hợp cùng dầu dừa, dầu argan và dầu hạt chia, thấm sâu vào tóc và da đầu giúp nuôi dưỡng tóc sâu từ bên trong, ngăn rụng và kích thích mọc tóc, phục hồi và bảo vệ tóc trước các tác nhân gây khô xơ và hư tổn.</p>','http://localhost:3014/uploads/images/40a8775c-e70f-411e-a521-1dac8ea66b39.jpg','pending',111,160000,0,NULL,NULL,NULL,NULL,2,11,NULL,NULL,0,0),(40,'Sữa Dưỡng Tóc Tsubaki Chống Nắng Và Phục Hồi Hư Tổn 100ml','sua-duong-toc-tsubaki-chong-nang-va-phuc-hoi-hu-ton-100ml','<p>Tinh Dầu Bưởi Gennie Cho Tóc Gãy Rụng 30ml là sản phẩm serum dưỡng tóc đến từ thương hiệu Gennie của Singapore, với tinh dầu vỏ bưởi 100% thiên nhiên kết hợp cùng dầu dừa, dầu argan và dầu hạt chia, thấm sâu vào tóc và da đầu giúp nuôi dưỡng tóc sâu từ bên trong, ngăn rụng và kích thích mọc tóc, phục hồi và bảo vệ tóc trước các tác nhân gây khô xơ và hư tổn.</p>','http://localhost:3014/uploads/images/cf664b0c-9726-453f-84a0-b2dd3eaba867.jpg','pending',111,157000,0,NULL,NULL,NULL,NULL,2,12,NULL,NULL,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_products_labels`
--

LOCK TABLES `ec_products_labels` WRITE;
/*!40000 ALTER TABLE `ec_products_labels` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_stock_ins`
--

LOCK TABLES `ec_stock_ins` WRITE;
/*!40000 ALTER TABLE `ec_stock_ins` DISABLE KEYS */;
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
  `agency_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_stock_outs_product_id_foreign` (`product_id`),
  KEY `ec_stock_outs_user_id_foreign` (`user_id`),
  CONSTRAINT `ec_stock_outs_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ec_stock_outs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_stock_outs`
--

LOCK TABLES `ec_stock_outs` WRITE;
/*!40000 ALTER TABLE `ec_stock_outs` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_transactions`
--

LOCK TABLES `ec_transactions` WRITE;
/*!40000 ALTER TABLE `ec_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_variant_attributes`
--

DROP TABLE IF EXISTS `ec_variant_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_variant_attributes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `variant_id` bigint unsigned NOT NULL,
  `attribute_value_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_variant_attributes_variant_id_foreign` (`variant_id`),
  KEY `ec_variant_attributes_attribute_value_id_foreign` (`attribute_value_id`),
  CONSTRAINT `ec_variant_attributes_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `ec_attribute_values` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ec_variant_attributes_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `ec_product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_variant_attributes`
--

LOCK TABLES `ec_variant_attributes` WRITE;
/*!40000 ALTER TABLE `ec_variant_attributes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_variant_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_warehouses`
--

DROP TABLE IF EXISTS `ec_warehouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_warehouses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_warehouses`
--

LOCK TABLES `ec_warehouses` WRITE;
/*!40000 ALTER TABLE `ec_warehouses` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_warehouses` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (57,'2014_10_12_000000_create_users_table',1),(58,'2014_10_12_100000_create_password_reset_tokens_table',1),(59,'2019_08_19_000000_create_failed_jobs_table',1),(60,'2019_12_14_000001_create_personal_access_tokens_table',1),(61,'2024_08_24_073329_create_products_table',1),(62,'2024_09_29_001703_create_permission_tables',1),(63,'2024_10_13_163624_create_csdl_base_module_admin',1),(64,'2024_10_15_155633_create_csdl_blogs_module_admin',1),(65,'2024_11_01_045329_create_supplier',1),(66,'2024_11_02_082440_alter_add_column_order_id',1),(67,'2024_11_07_164654_create_services_table',1),(68,'2024_11_13_041229_create_services_user_table',1),(69,'2024_11_15_102428_create_votes_table',1),(70,'2024_11_18_013349_create_setting_informations_table',1),(71,'2024_11_28_094751_create_work_table',2),(72,'2024_12_04_142217_create_branch_table',3),(73,'2024_12_20_023118_alter_column_size_color_product_table',4);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'VND','COD',NULL,'Nhận hàng thanh toán',1,'active',NULL,'2024-11-22 00:26:18',NULL),(2,'VND','Thanh toán online',NULL,'VnPay',0,'active',NULL,NULL,NULL);
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
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',3,'MyApp','84cff268224277d8dd0396928140eccb2e1ad177560498eaa0c85604c1974b8f','[\"*\"]',NULL,NULL,'2024-11-28 01:17:49','2024-11-28 01:17:49'),(2,'App\\Models\\User',3,'MyApp','a46e2333efbf23e9a3a46232d3596bac7631a56f74e8ab48e506c485509511c6','[\"*\"]','2024-12-19 19:44:38',NULL,'2024-11-28 01:18:08','2024-12-19 19:44:38');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Dịch vụ massage thư giãn',NULL,0,100000,'<p>Dịch vụ thư giãn massage gội đầu</p>',NULL,NULL),(2,'Gói combo 7 bước',NULL,0,100000,'<p>combo cắt - uốn - gội - nhuộm - massage - gội đầu - tạo kiểu</p>',NULL,NULL),(3,'Dịch vụ hớt tóc',NULL,1,90000,'<p>Cắt tóc tạo kiểu</p>',NULL,NULL),(4,'Cắt Tóc',NULL,1,70000,'<p>cắt tóc</p>',NULL,NULL);
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
  `action_id` int NOT NULL COMMENT 'nhân viên được giao',
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
  KEY `services_user_service_id_index` (`service_id`),
  KEY `services_user_action_id_index` (`action_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_user`
--

LOCK TABLES `services_user` WRITE;
/*!40000 ALTER TABLE `services_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `services_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting_information`
--

DROP TABLE IF EXISTS `setting_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setting_information` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `favicon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fax` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `copyright` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting_information`
--

LOCK TABLES `setting_information` WRITE;
/*!40000 ALTER TABLE `setting_information` DISABLE KEYS */;
INSERT INTO `setting_information` VALUES (1,'http://localhost:3014/uploads/images/27dccfb0-33e6-482e-8aa6-cf115c7d1b80.png',NULL,'SShirot - Neptune','hudony00800@gmail.com','Quận 9 - TP Hồ Chí Minh',NULL,NULL,'0352344402','SShirot - Neptune',NULL,NULL);
/*!40000 ALTER TABLE `setting_information` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slides`
--

LOCK TABLES `slides` WRITE;
/*!40000 ALTER TABLE `slides` DISABLE KEYS */;
INSERT INTO `slides` VALUES (1,'Danh Hiệu','Top 1 barbershop toàn quốc',1,'home','http://30shine.com','http://localhost:3014/uploads/images/12e238cf-bf7f-4b34-b0fe-1cb80639f34d.jpg','pending',NULL,NULL),(2,'Combo Haircut','Combo 7 bước',1,'home','http://30shine.com','http://localhost:3014/uploads/images/922f034d-fabb-40ea-8195-eea6a052450e.jpg','pending',NULL,NULL),(4,'Huy','12131',1,'home','https://30shine.com/','http://localhost:3014/uploads/images/12836d0c-58fd-424a-b761-decb07c929ad.jpeg','pending',NULL,NULL);
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
  `user_type` enum('USER','ADMIN','STAFF') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Nguyen Khac Huy','hudony00800@gmail.com',NULL,'$2a$10$OYVau1493FzDtTtuJYGDnudYD7saDLlYqgYEUa66ALcG3JzKgVSaO','0352344059',NULL,NULL,2,'http://localhost:3014/uploads/images/67c8a2af-78d4-47a5-be7f-49f025167335.jpg','ADMIN',NULL,NULL,NULL),(4,'Le Bui Huu Phuc','21110773@student.hcmute.edu.vn',NULL,'$2a$10$w1GUvJpRYbo34OiGunWuOeIaSq8y2dXrIATM34/QEWhqDJr/Jp98S','0352344059',NULL,NULL,2,'http://localhost:3014/uploads/images/f2c86a68-ef98-4b83-805a-419b12d736db.jpg','STAFF',NULL,NULL,NULL),(5,'Huy User','tik876964@gmail.com',NULL,'$2a$10$.bUIB2chmAn5dPSIcPNjDOqowRJshlesbtARn7k7hnoDSerGPVcDa','0352344059',NULL,NULL,2,'https://via.placeholder.com/150','USER',NULL,NULL,NULL),(6,'Huy khac','tik052423@gmail.com',NULL,'$2a$10$TRi5f0vheJOe655wrSiJh.2puCwjKaR8ydjOIYRdQkl8bczkKjkly','0352344059',NULL,NULL,2,'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg','STAFF',NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_types`
--

LOCK TABLES `users_has_types` WRITE;
/*!40000 ALTER TABLE `users_has_types` DISABLE KEYS */;
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
INSERT INTO `users_types` VALUES (1,'ADMIN','2024-11-22 00:26:16','2024-11-22 00:26:16'),(2,'USER','2024-11-22 00:26:16','2024-11-22 00:26:16'),(3,'SYSTEM','2024-11-22 00:26:16','2024-11-22 00:26:16');
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
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rating` int NOT NULL DEFAULT '0',
  `product_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `images` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `votes_product_id_foreign` (`product_id`),
  KEY `votes_user_id_foreign` (`user_id`),
  CONSTRAINT `votes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `votes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_preferences`
--

DROP TABLE IF EXISTS `work_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_preferences` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `shift_morning` tinyint(1) NOT NULL DEFAULT '0',
  `shift_afternoon` tinyint(1) NOT NULL DEFAULT '0',
  `shift_night` tinyint(1) NOT NULL DEFAULT '0',
  `full_week` tinyint(1) NOT NULL DEFAULT '0',
  `off_saturday` tinyint(1) NOT NULL DEFAULT '0',
  `off_sunday` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `work_preferences_user_id_foreign` (`user_id`),
  CONSTRAINT `work_preferences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_preferences`
--

LOCK TABLES `work_preferences` WRITE;
/*!40000 ALTER TABLE `work_preferences` DISABLE KEYS */;
INSERT INTO `work_preferences` VALUES (7,4,1,1,1,1,0,0,'2025-03-01 13:13:40','2025-03-01 13:13:40');
/*!40000 ALTER TABLE `work_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_schedules`
--

DROP TABLE IF EXISTS `work_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_schedules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `work_date` date NOT NULL,
  `shift` enum('morning','afternoon','night','full_day') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `work_schedules_user_id_foreign` (`user_id`),
  CONSTRAINT `work_schedules_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_schedules`
--

LOCK TABLES `work_schedules` WRITE;
/*!40000 ALTER TABLE `work_schedules` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_schedules` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-01 20:35:28
