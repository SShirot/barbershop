-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 27, 2024 at 02:27 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `core_ecm`
--

-- --------------------------------------------------------

--
-- Table structure for table `acl_model_has_permissions`
--

CREATE TABLE `acl_model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `acl_model_has_roles`
--

CREATE TABLE `acl_model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `acl_model_has_roles`
--

INSERT INTO `acl_model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\UserApi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `acl_permissions`
--

CREATE TABLE `acl_permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `acl_permissions`
--

INSERT INTO `acl_permissions` (`id`, `name`, `guard_name`, `group`, `description`, `created_at`, `updated_at`) VALUES
(1, 'all', 'api', 'all', 'Toàn quyền', '2024-11-22 00:26:19', '2024-11-22 00:26:19'),
(2, 'product_index', 'api', 'product_index', 'Danh sách sản phẩm', '2024-11-22 00:26:19', '2024-11-22 00:26:19');

-- --------------------------------------------------------

--
-- Table structure for table `acl_roles`
--

CREATE TABLE `acl_roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `acl_roles`
--

INSERT INTO `acl_roles` (`id`, `name`, `guard_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'administrator', 'api', 'Toàn quyền', '2024-11-22 00:26:19', '2024-11-22 00:26:19'),
(2, 'manage', 'api', 'Quản lý', '2024-11-22 00:26:19', '2024-11-22 00:26:19'),
(3, 'general_director', 'api', 'Tổng giám đốc', '2024-11-22 00:26:19', '2024-11-22 00:26:19'),
(4, 'staff', 'api', 'Nhân viên', '2024-11-22 00:26:19', '2024-11-22 00:26:19');

-- --------------------------------------------------------

--
-- Table structure for table `acl_role_has_permissions`
--

CREATE TABLE `acl_role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `swift_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bl_articles`
--

CREATE TABLE `bl_articles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `author_id` int(11) DEFAULT NULL,
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `is_featured` tinyint(4) NOT NULL DEFAULT '0',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` bigint(20) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bl_articles_tags`
--

CREATE TABLE `bl_articles_tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `article_id` bigint(20) UNSIGNED NOT NULL,
  `tag_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bl_menus`
--

CREATE TABLE `bl_menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_featured` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bl_tags`
--

CREATE TABLE `bl_tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_featured` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `title_seo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_seo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords_seo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `index_seo` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `avatar`, `icon`, `status`, `description`, `parent_id`, `title_seo`, `description_seo`, `keywords_seo`, `index_seo`, `created_at`, `updated_at`) VALUES
(1, 'Quần áo nam', 'quan-ao-nam', NULL, NULL, 'pending', NULL, 0, NULL, NULL, NULL, 1, '2024-11-22 00:26:18', NULL),
(2, 'Quần áo nữ', 'quan-ao-nu', NULL, NULL, 'pending', 'Quần áo nữ', 0, NULL, NULL, NULL, 1, NULL, NULL),
(3, 'Quần áo trẻ em', 'quan-ao-tre-em', NULL, NULL, 'pending', 'Quần áo trẻ em', 0, NULL, NULL, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ec_attributes`
--

CREATE TABLE `ec_attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint(4) NOT NULL DEFAULT '0',
  `is_use_in_product_listing` tinyint(4) NOT NULL DEFAULT '0',
  `use_image_from_product_variation` tinyint(4) NOT NULL DEFAULT '0',
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_attributes`
--

INSERT INTO `ec_attributes` (`id`, `name`, `slug`, `order`, `is_use_in_product_listing`, `use_image_from_product_variation`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Size', 'size', 0, 0, 0, 'pending', '2024-11-22 09:43:52', '2024-11-23 14:14:12'),
(5, 'Color', 'color', 0, 0, 0, 'pending', '2024-11-23 14:17:52', '2024-11-23 14:21:02'),
(13, 'RAM', 'ram', 0, 0, 0, 'pending', '2024-11-23 14:21:15', '2024-11-23 14:23:05');

-- --------------------------------------------------------

--
-- Table structure for table `ec_attribute_values`
--

CREATE TABLE `ec_attribute_values` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `attribute_id` bigint(20) UNSIGNED NOT NULL,
  `is_default` tinyint(4) NOT NULL DEFAULT '0',
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_attribute_values`
--

INSERT INTO `ec_attribute_values` (`id`, `attribute_id`, `is_default`, `color`, `image`, `title`, `slug`, `created_at`, `updated_at`) VALUES
(21, 1, 1, '#e52424', NULL, 'M', 'm', '2024-11-23 14:14:12', '2024-11-23 14:14:12'),
(22, 1, 0, '#a86767', NULL, 'L', 'l', '2024-11-23 14:14:12', '2024-11-23 14:14:12'),
(23, 1, 0, '#6b4343', NULL, 'X', 'x', '2024-11-23 14:14:12', '2024-11-23 14:14:12'),
(24, 1, 0, '#4b3f3f', NULL, 'XS', 'xs', '2024-11-23 14:14:12', '2024-11-23 14:14:12'),
(25, 5, 1, '#1475db', NULL, 'Xanh', 'xanh', '2024-11-23 14:21:02', '2024-11-23 14:21:02'),
(26, 5, 0, '#f00000', NULL, 'Đỏ', 'đỏ', '2024-11-23 14:21:02', '2024-11-23 14:21:02'),
(27, 13, 1, '#000000', NULL, '2GB', '2gb', '2024-11-23 14:23:05', '2024-11-23 14:23:05');

-- --------------------------------------------------------

--
-- Table structure for table `ec_brands`
--

CREATE TABLE `ec_brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_seo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_seo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords_seo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `index_seo` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_brands`
--

INSERT INTO `ec_brands` (`id`, `name`, `slug`, `avatar`, `status`, `description`, `title_seo`, `description_seo`, `keywords_seo`, `index_seo`, `created_at`, `updated_at`) VALUES
(1, 'Nike', 'nike', NULL, 'pending', NULL, NULL, NULL, NULL, 1, '2024-11-22 00:26:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ec_orders`
--

CREATE TABLE `ec_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `payment_method_id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_shipping_fee` bigint(20) NOT NULL DEFAULT '0',
  `payment_status` enum('pending','completed','refunding','refunded','fraud','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `status` enum('pending','processing','completed','canceled','returned') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `coupon_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(16,2) NOT NULL COMMENT 'Tổng tiền hàng',
  `shipping_amount` decimal(16,2) NOT NULL COMMENT 'Tiền ship',
  `tax_amount` decimal(16,2) NOT NULL COMMENT 'tiền thuế',
  `discount_amount` decimal(16,2) NOT NULL COMMENT 'Tiền giảm giá',
  `sub_total` decimal(16,2) NOT NULL COMMENT 'Tổng tiền',
  `completed_at` datetime DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `supplier_id` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_orders`
--

INSERT INTO `ec_orders` (`id`, `user_id`, `payment_method_id`, `code`, `total_shipping_fee`, `payment_status`, `status`, `coupon_code`, `amount`, `shipping_amount`, `tax_amount`, `discount_amount`, `sub_total`, `completed_at`, `notes`, `created_at`, `updated_at`, `supplier_id`) VALUES
(1, 2, 1, 'ODfS7doIL9', 0, 'pending', 'pending', NULL, '950000.00', '0.00', '0.00', '0.00', '950000.00', NULL, NULL, '2024-11-24 17:16:01', NULL, 0),
(2, 2, 1, 'ODf7BhtCTX', 0, 'pending', 'pending', NULL, '2850000.00', '0.00', '0.00', '0.00', '2850000.00', NULL, NULL, '2024-11-24 17:23:49', NULL, 0),
(3, 2, 1, 'ODRGmBj8P2', 0, 'pending', 'pending', NULL, '3800000.00', '0.00', '0.00', '0.00', '3800000.00', NULL, NULL, '2024-11-24 17:27:42', NULL, 0),
(4, 2, 2, 'ODbjSDnUjE', 0, 'pending', 'pending', NULL, '340000.00', '0.00', '0.00', '0.00', '340000.00', NULL, NULL, '2024-11-24 17:29:37', NULL, 0),
(5, 2, 1, 'ODFdVzHtto', 0, 'pending', 'pending', NULL, '1020000.00', '0.00', '0.00', '0.00', '1020000.00', NULL, NULL, '2024-11-24 17:30:47', NULL, 0),
(6, 2, 2, 'ODP5xkfxIS', 0, 'pending', 'pending', NULL, '1360000.00', '0.00', '0.00', '0.00', '1360000.00', NULL, NULL, '2024-11-24 17:32:06', NULL, 0),
(7, 2, 1, 'OD595EzJBk', 0, 'pending', 'pending', NULL, '2040000.00', '0.00', '0.00', '0.00', '2040000.00', NULL, NULL, '2024-11-24 17:32:46', NULL, 0),
(8, 2, 2, 'ODvOq0bjvr', 0, 'pending', 'pending', NULL, '2380000.00', '0.00', '0.00', '0.00', '2380000.00', NULL, NULL, '2024-11-24 17:33:02', NULL, 0),
(9, 2, 2, 'ODXEhhLAsQ', 0, 'pending', 'pending', NULL, '50000.00', '0.00', '0.00', '0.00', '50000.00', NULL, NULL, '2024-11-24 17:34:27', NULL, 0),
(10, 2, 2, 'ODwlWnuQsl', 0, 'pending', 'pending', NULL, '1020000.00', '0.00', '0.00', '0.00', '1020000.00', NULL, NULL, '2024-11-26 07:36:28', NULL, 0),
(11, 2, 1, 'OD7W6JLuuz', 0, 'pending', 'pending', NULL, '590000.00', '0.00', '0.00', '0.00', '590000.00', NULL, NULL, '2024-11-26 08:22:27', NULL, 0),
(12, 2, 2, 'ODJG7rmKEr', 0, 'pending', 'pending', NULL, '1180000.00', '0.00', '0.00', '0.00', '1180000.00', NULL, NULL, '2024-11-26 08:22:41', NULL, 0),
(13, 2, 1, 'ODX3kasMIj', 0, 'pending', 'pending', NULL, '340000.00', '0.00', '0.00', '0.00', '340000.00', NULL, NULL, '2024-11-26 08:49:16', NULL, 0),
(14, 2, 2, 'OD8QshxwYd', 0, 'pending', 'pending', NULL, '680000.00', '0.00', '0.00', '0.00', '680000.00', NULL, NULL, '2024-11-26 08:49:26', NULL, 0),
(15, 2, 2, 'ODN92n89ym', 0, 'completed', 'pending', NULL, '590000.00', '0.00', '0.00', '0.00', '590000.00', NULL, NULL, '2024-11-26 09:09:52', '2024-11-26 10:34:03', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ec_products`
--

CREATE TABLE `ec_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `number` int(11) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL DEFAULT '0',
  `sale` int(11) NOT NULL DEFAULT '0',
  `contents` text COLLATE utf8mb4_unicode_ci,
  `length` double(8,2) DEFAULT NULL,
  `width` double(8,2) DEFAULT NULL,
  `height` double(8,2) DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `total_vote_count` int(11) NOT NULL DEFAULT '0',
  `total_rating_score` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_products`
--

INSERT INTO `ec_products` (`id`, `name`, `slug`, `description`, `avatar`, `status`, `number`, `price`, `sale`, `contents`, `length`, `width`, `height`, `category_id`, `brand_id`, `created_at`, `updated_at`, `total_vote_count`, `total_rating_score`) VALUES
(1, 'Áo thun cổ đức DIVAS', 'ao-thun-co-duc-divas', NULL, 'http://localhost:3014/uploads/images/8bc02377-1af0-4de0-8a3f-1009be89dc5c.webp', 'pending', 100, 500000, 0, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 0, 0),
(2, 'Quần Tây Ống đứng Divas', 'quan-tay-ong-dung-divas', '<p>Quần Tây Ống đứng Divas</p>', 'http://localhost:3014/uploads/images/59c800cc-537d-425a-bd4c-cb722d971035.webp', 'pending', 0, 450000, 0, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 0, 0),
(3, 'Áo lụa Tencel thân bèo cách điệu', 'ao-lua-tencel-than-beo-cach-dieu', '<p>Áo lụa Tencel thân bèo cách điệu</p>', 'http://localhost:3014/uploads/images/4e2b5c71-cf3c-4a78-b317-15292f5b871c.webp', 'pending', 0, 1900000, 0, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL, 0, 0),
(4, 'Chân váy Tuysi Costliness', 'chan-vay-tuysi-costliness', '<p>Đầm ôm cổ V Opulence</p>', 'http://localhost:3014/uploads/images/74a76ecc-5dd1-48c1-a260-eb0d3e04f83e.webp', 'pending', 100, 590000, 0, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL, 0, 0),
(5, 'Áo sơ mi Croptop Office', 'ao-so-mi-croptop-office', '<p>Áo sơ mi Croptop Office</p>', 'http://localhost:3014/uploads/images/c4674904-b81a-45ab-848d-603099c2ad57.webp', 'pending', 100, 500000, 0, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 0, 0),
(6, 'Quần suông Tuysi Nature', 'quan-suong-tuysi-nature', '<p>Quần suông Tuysi Nature</p>', 'http://localhost:3014/uploads/images/4d27ee41-3d5a-4c19-82a3-5c5bd35d1c27.webp', 'pending', 100, 1490000, 0, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL, 0, 0),
(7, 'Đầm ôm cổ V Opulence', 'dam-om-co-v-opulence', '<p>Đầm ôm cổ V Opulence</p>', 'http://localhost:3014/uploads/images/d194c691-0d4e-492d-bacc-d5d0dbeb01c4.webp', 'pending', 0, 1700000, 0, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL, 0, 0),
(8, 'Áo sơ mi lụa cổ đổ Lucille', 'ao-so-mi-lua-co-do-lucille', '<p>Áo sơ mi lụa cổ đổ Lucille</p>', 'http://localhost:3014/uploads/images/91a6b568-ba7d-47a6-bca2-7cc9b98cb054.webp', 'pending', 100, 950000, 0, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL, 0, 0),
(9, 'Áo thun Cheetah', 'ao-thun-cheetah', '<p>Áo thun Cheetah</p>', 'http://localhost:3014/uploads/images/1bd5ea47-21eb-4b2f-9e30-dc0ada23b04f.webp', 'pending', 100, 50000, 0, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL, 0, 0),
(10, 'Áo thun thêu Cute', 'ao-thun-theu-cute', '<p>Áo thun thêu Cute</p>', 'http://localhost:3014/uploads/images/3d198c17-a153-4ddf-9005-5bc2175f3c33.webp', 'pending', 0, 340000, 0, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL, 0, 0),
(11, 'Áo sơ mi lụa cổ đổ Lucille', 'ao-so-mi-lua-co-do-lucille', '<p>Áo sơ mi lụa cổ đổ Lucille</p>', 'http://localhost:3014/uploads/images/91a6b568-ba7d-47a6-bca2-7cc9b98cb054.webp', 'pending', 100, 950000, 0, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL, 0, 0),
(12, 'Áo thun Cheetah', 'ao-thun-cheetah', '<p>Áo thun Cheetah</p>', 'http://localhost:3014/uploads/images/1bd5ea47-21eb-4b2f-9e30-dc0ada23b04f.webp', 'pending', 100, 50000, 0, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL, 0, 0),
(13, 'Áo thun thêu Cute', 'ao-thun-theu-cute', '<p>Áo thun thêu Cute</p>', 'http://localhost:3014/uploads/images/3d198c17-a153-4ddf-9005-5bc2175f3c33.webp', 'pending', 0, 340000, 0, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL, 0, 0),
(14, 'Áo thun Cloud', 'ao-thun-cloud', '<p>Áo thun Cloud</p>', 'http://localhost:3014/uploads/images/107d6cf6-92bd-4449-9530-81985367bcc4.webp', 'pending', 0, 100000, 0, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL, 0, 0),
(15, 'Prime Polo - Áo Polo Modal Slim Fit', 'prime-polo-ao-polo-modal-slim-fit', '<p>Prime Polo - Áo Polo Modal Slim Fit</p>', 'http://localhost:3014/uploads/images/b0570a48-1f70-4ae2-baff-a7836aea9c2f.jpg', 'pending', 100, 590000, 0, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 0, 0),
(16, 'Prime Polo - Áo Polo Modal Slim Fit', 'prime-polo-ao-polo-modal-slim-fit', '<p>Prime Polo - Áo Polo Modal Slim Fit</p>', 'http://localhost:3014/uploads/images/2ace49ac-eaf7-4458-8be4-efbcb5f880d4.jpg', 'pending', 100, 595000, 0, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 0, 0),
(17, 'Quần shorts Regular Khaki Nhung', 'quan-shorts-regular-khaki-nhung', '<p>Quần shorts Regular Khaki Nhung</p>', 'http://localhost:3014/uploads/images/55319339-50dc-4c8f-8323-b0ee45095635.jpg', 'pending', 100, 623000, 0, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 0, 0),
(18, 'Áo len kẻ tay ngắn', 'ao-len-ke-tay-ngan', '<p>999.000</p>', 'http://localhost:3014/uploads/images/2f467350-6d85-4d45-8998-e9df1a59fdef.webp', 'pending', 1000, 999000, 0, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ec_products_labels`
--

CREATE TABLE `ec_products_labels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_label_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_products_labels`
--

INSERT INTO `ec_products_labels` (`id`, `product_id`, `product_label_id`, `created_at`, `updated_at`) VALUES
(2, 2, 3, NULL, NULL),
(4, 4, 1, NULL, NULL),
(5, 1, 2, NULL, NULL),
(6, 3, 2, NULL, NULL),
(7, 3, 3, NULL, NULL),
(8, 8, 2, NULL, NULL),
(9, 6, 1, NULL, NULL),
(10, 6, 3, NULL, NULL),
(11, 10, 1, NULL, NULL),
(12, 9, 1, NULL, NULL),
(13, 14, 1, NULL, NULL),
(14, 15, 2, NULL, NULL),
(15, 16, 1, NULL, NULL),
(16, 16, 3, NULL, NULL),
(17, 17, 1, NULL, NULL),
(18, 17, 3, NULL, NULL),
(19, 18, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ec_product_labels`
--

CREATE TABLE `ec_product_labels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint(4) NOT NULL DEFAULT '0',
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_product_labels`
--

INSERT INTO `ec_product_labels` (`id`, `name`, `description`, `slug`, `order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'New', 'New', 'new', 0, 'pending', NULL, NULL),
(2, 'Hot', 'Hot', 'hot', 0, 'pending', NULL, NULL),
(3, 'Sale', 'Sale', 'sale', 0, 'pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ec_product_options`
--

CREATE TABLE `ec_product_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint(4) NOT NULL DEFAULT '0',
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ec_product_options_values`
--

CREATE TABLE `ec_product_options_values` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_option_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ec_product_variants`
--

CREATE TABLE `ec_product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ec_stock_ins`
--

CREATE TABLE `ec_stock_ins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) DEFAULT '0',
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'final: Kho thành phẩm      ingredient: kho nguyên liệu   '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ec_stock_outs`
--

CREATE TABLE `ec_stock_outs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) DEFAULT '0',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'final: Kho thành phẩm      ingredient: kho nguyên liệu   ',
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ec_transactions`
--

CREATE TABLE `ec_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `qty` int(11) NOT NULL DEFAULT '1',
  `price` bigint(20) NOT NULL DEFAULT '0',
  `total_price` bigint(20) NOT NULL DEFAULT '0',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_transactions`
--

INSERT INTO `ec_transactions` (`id`, `order_id`, `product_id`, `qty`, `price`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 8, 1, 950000, 950000, 'pending', NULL, NULL),
(2, 2, 8, 3, 950000, 2850000, 'pending', NULL, NULL),
(3, 3, 8, 4, 950000, 3800000, 'pending', NULL, NULL),
(4, 4, 10, 1, 340000, 340000, 'pending', NULL, NULL),
(5, 5, 10, 3, 340000, 1020000, 'pending', NULL, NULL),
(6, 6, 10, 4, 340000, 1360000, 'pending', NULL, NULL),
(7, 7, 10, 6, 340000, 2040000, 'pending', NULL, NULL),
(8, 8, 10, 7, 340000, 2380000, 'pending', NULL, NULL),
(9, 9, 9, 1, 50000, 50000, 'pending', NULL, NULL),
(10, 10, 13, 3, 340000, 1020000, 'pending', NULL, NULL),
(11, 11, 15, 1, 590000, 590000, 'pending', NULL, NULL),
(12, 12, 15, 2, 590000, 1180000, 'pending', NULL, NULL),
(13, 13, 13, 1, 340000, 340000, 'pending', NULL, NULL),
(14, 14, 13, 2, 340000, 680000, 'pending', NULL, NULL),
(15, 15, 15, 1, 590000, 590000, 'pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ec_variant_attributes`
--

CREATE TABLE `ec_variant_attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `variant_id` bigint(20) UNSIGNED NOT NULL,
  `attribute_value_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ec_warehouses`
--

CREATE TABLE `ec_warehouses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(57, '2014_10_12_000000_create_users_table', 1),
(58, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(59, '2019_08_19_000000_create_failed_jobs_table', 1),
(60, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(61, '2024_08_24_073329_create_products_table', 1),
(62, '2024_09_29_001703_create_permission_tables', 1),
(63, '2024_10_13_163624_create_csdl_base_module_admin', 1),
(64, '2024_10_15_155633_create_csdl_blogs_module_admin', 1),
(65, '2024_11_01_045329_create_supplier', 1),
(66, '2024_11_02_082440_alter_add_column_order_id', 1),
(67, '2024_11_07_164654_create_services_table', 1),
(68, '2024_11_13_041229_create_services_user_table', 1),
(69, '2024_11_15_102428_create_votes_table', 1),
(70, '2024_11_18_013349_create_setting_informations_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VND',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `config` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `currency`, `name`, `avatar`, `description`, `is_default`, `status`, `config`, `created_at`, `updated_at`) VALUES
(1, 'VND', 'COD', NULL, 'Nhận hàng thanh toán', 1, 'active', NULL, '2024-11-22 00:26:18', NULL),
(2, 'VND', 'Thanh toán online', NULL, 'VnPay', 0, 'active', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_home_service` tinyint(1) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services_user`
--

CREATE TABLE `services_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL COMMENT 'nhân viên được giao',
  `price` int(11) NOT NULL DEFAULT '0',
  `status` enum('pending','processing','completed','canceled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `is_home_service` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `setting_information`
--

CREATE TABLE `setting_information` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `favicon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map` text COLLATE utf8mb4_unicode_ci,
  `fax` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `copyright` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `setting_information`
--

INSERT INTO `setting_information` (`id`, `logo`, `favicon`, `name`, `email`, `full_address`, `map`, `fax`, `contact_number`, `copyright`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'Phú Phan', 'phupt.humg.94@gmail.com', 'Tứ Hiệp - Thanh Trì - Hà Nội', NULL, NULL, '0986420994', 'Code thuê đồ án CNTT', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `slides`
--

CREATE TABLE `slides` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` tinyint(4) NOT NULL DEFAULT '1',
  `page` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'home',
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `slides`
--

INSERT INTO `slides` (`id`, `name`, `description`, `position`, `page`, `link`, `avatar`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Sale kịch sàn', 'Sale kịch sàn', 1, 'home', 'http://123code.net', 'http://localhost:3014/uploads/images/f6ba153e-2cae-4487-b8cc-9f744346547e.webp', 'pending', NULL, NULL),
(2, 'Sale kịch sàn', 'Sale kịch sàn', 1, 'home', 'http://123code.net', 'http://localhost:3014/uploads/images/fe77d5c9-4956-4e13-901c-68332843ece0.webp', 'pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` enum('USER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `phone`, `provider`, `provider_id`, `status`, `avatar`, `user_type`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'ADMIN', 'admin@gmail.com', NULL, '$2y$12$zyagDBRYo4vlAiHIeSt9y.k0CIXUcOY08roIYA0tBZnQUdgqcXK8.', '0986420994', NULL, NULL, 1, NULL, 'USER', NULL, '2024-11-22 00:26:17', '2024-11-22 00:26:17'),
(2, 'Phan Phu', 'phupt.humg.94@gmail.com', NULL, '$2a$10$Yvb0IOPOsDTC5/pctCCD6OFwpaOBdCSSpJl66YLcINIgSAqHitqly', NULL, NULL, NULL, 2, 'https://via.placeholder.com/150', 'USER', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_bank_accounts`
--

CREATE TABLE `users_bank_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `bank_id` bigint(20) UNSIGNED NOT NULL,
  `account_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_branch` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_has_types`
--

CREATE TABLE `users_has_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `user_type_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_has_types`
--

INSERT INTO `users_has_types` (`id`, `user_id`, `user_type_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, NULL, NULL),
(2, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_types`
--

CREATE TABLE `users_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_types`
--

INSERT INTO `users_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'ADMIN', '2024-11-22 00:26:16', '2024-11-22 00:26:16'),
(2, 'USER', '2024-11-22 00:26:16', '2024-11-22 00:26:16'),
(3, 'SYSTEM', '2024-11-22 00:26:16', '2024-11-22 00:26:16');

-- --------------------------------------------------------

--
-- Table structure for table `users_wallets`
--

CREATE TABLE `users_wallets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `balance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_wallets_transactions`
--

CREATE TABLE `users_wallets_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `wallet_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('credit','debit') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','paid','reject','cancel') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `rating` int(11) NOT NULL DEFAULT '0',
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('published','draft','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acl_model_has_permissions`
--
ALTER TABLE `acl_model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `acl_model_has_roles`
--
ALTER TABLE `acl_model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `acl_permissions`
--
ALTER TABLE `acl_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acl_permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `acl_roles`
--
ALTER TABLE `acl_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acl_roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `acl_role_has_permissions`
--
ALTER TABLE `acl_role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `acl_role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bl_articles`
--
ALTER TABLE `bl_articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bl_articles_menu_id_foreign` (`menu_id`),
  ADD KEY `bl_articles_author_id_index` (`author_id`);

--
-- Indexes for table `bl_articles_tags`
--
ALTER TABLE `bl_articles_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bl_articles_tags_article_id_foreign` (`article_id`),
  ADD KEY `bl_articles_tags_tag_id_foreign` (`tag_id`);

--
-- Indexes for table `bl_menus`
--
ALTER TABLE `bl_menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bl_tags`
--
ALTER TABLE `bl_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_parent_id_index` (`parent_id`);

--
-- Indexes for table `ec_attributes`
--
ALTER TABLE `ec_attributes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ec_attribute_values`
--
ALTER TABLE `ec_attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ec_attribute_values_attribute_id_foreign` (`attribute_id`);

--
-- Indexes for table `ec_brands`
--
ALTER TABLE `ec_brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ec_orders`
--
ALTER TABLE `ec_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ec_orders_code_unique` (`code`),
  ADD KEY `ec_orders_user_id_foreign` (`user_id`),
  ADD KEY `ec_orders_payment_method_id_foreign` (`payment_method_id`);

--
-- Indexes for table `ec_products`
--
ALTER TABLE `ec_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ec_products_category_id_foreign` (`category_id`),
  ADD KEY `ec_products_brand_id_foreign` (`brand_id`);

--
-- Indexes for table `ec_products_labels`
--
ALTER TABLE `ec_products_labels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ec_products_labels_product_id_foreign` (`product_id`),
  ADD KEY `ec_products_labels_product_label_id_foreign` (`product_label_id`);

--
-- Indexes for table `ec_product_labels`
--
ALTER TABLE `ec_product_labels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ec_product_options`
--
ALTER TABLE `ec_product_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ec_product_options_values`
--
ALTER TABLE `ec_product_options_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ec_product_options_values_product_option_id_foreign` (`product_option_id`);

--
-- Indexes for table `ec_product_variants`
--
ALTER TABLE `ec_product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ec_product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `ec_stock_ins`
--
ALTER TABLE `ec_stock_ins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ec_stock_ins_product_id_foreign` (`product_id`);

--
-- Indexes for table `ec_stock_outs`
--
ALTER TABLE `ec_stock_outs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ec_stock_outs_product_id_foreign` (`product_id`),
  ADD KEY `ec_stock_outs_user_id_foreign` (`user_id`);

--
-- Indexes for table `ec_transactions`
--
ALTER TABLE `ec_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ec_transactions_order_id_foreign` (`order_id`),
  ADD KEY `ec_transactions_product_id_foreign` (`product_id`);

--
-- Indexes for table `ec_variant_attributes`
--
ALTER TABLE `ec_variant_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ec_variant_attributes_variant_id_foreign` (`variant_id`),
  ADD KEY `ec_variant_attributes_attribute_value_id_foreign` (`attribute_value_id`);

--
-- Indexes for table `ec_warehouses`
--
ALTER TABLE `ec_warehouses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services_user`
--
ALTER TABLE `services_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_user_user_id_index` (`user_id`),
  ADD KEY `services_user_service_id_index` (`service_id`),
  ADD KEY `services_user_action_id_index` (`action_id`);

--
-- Indexes for table `setting_information`
--
ALTER TABLE `setting_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slides`
--
ALTER TABLE `slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `users_bank_accounts`
--
ALTER TABLE `users_bank_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_bank_accounts_user_id_foreign` (`user_id`),
  ADD KEY `users_bank_accounts_bank_id_foreign` (`bank_id`);

--
-- Indexes for table `users_has_types`
--
ALTER TABLE `users_has_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_has_types_user_id_foreign` (`user_id`),
  ADD KEY `users_has_types_user_type_id_foreign` (`user_type_id`);

--
-- Indexes for table `users_types`
--
ALTER TABLE `users_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_types_name_unique` (`name`);

--
-- Indexes for table `users_wallets`
--
ALTER TABLE `users_wallets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_wallets_user_id_foreign` (`user_id`);

--
-- Indexes for table `users_wallets_transactions`
--
ALTER TABLE `users_wallets_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_wallets_transactions_wallet_id_foreign` (`wallet_id`),
  ADD KEY `users_wallets_transactions_user_id_foreign` (`user_id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votes_product_id_foreign` (`product_id`),
  ADD KEY `votes_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acl_permissions`
--
ALTER TABLE `acl_permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `acl_roles`
--
ALTER TABLE `acl_roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bl_articles`
--
ALTER TABLE `bl_articles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bl_articles_tags`
--
ALTER TABLE `bl_articles_tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bl_menus`
--
ALTER TABLE `bl_menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bl_tags`
--
ALTER TABLE `bl_tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ec_attributes`
--
ALTER TABLE `ec_attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ec_attribute_values`
--
ALTER TABLE `ec_attribute_values`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `ec_brands`
--
ALTER TABLE `ec_brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ec_orders`
--
ALTER TABLE `ec_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ec_products`
--
ALTER TABLE `ec_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `ec_products_labels`
--
ALTER TABLE `ec_products_labels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `ec_product_labels`
--
ALTER TABLE `ec_product_labels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ec_product_options`
--
ALTER TABLE `ec_product_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ec_product_options_values`
--
ALTER TABLE `ec_product_options_values`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ec_product_variants`
--
ALTER TABLE `ec_product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ec_stock_ins`
--
ALTER TABLE `ec_stock_ins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ec_stock_outs`
--
ALTER TABLE `ec_stock_outs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ec_transactions`
--
ALTER TABLE `ec_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ec_variant_attributes`
--
ALTER TABLE `ec_variant_attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ec_warehouses`
--
ALTER TABLE `ec_warehouses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services_user`
--
ALTER TABLE `services_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `setting_information`
--
ALTER TABLE `setting_information`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `slides`
--
ALTER TABLE `slides`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_bank_accounts`
--
ALTER TABLE `users_bank_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_has_types`
--
ALTER TABLE `users_has_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_types`
--
ALTER TABLE `users_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users_wallets`
--
ALTER TABLE `users_wallets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_wallets_transactions`
--
ALTER TABLE `users_wallets_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `acl_model_has_permissions`
--
ALTER TABLE `acl_model_has_permissions`
  ADD CONSTRAINT `acl_model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `acl_permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `acl_model_has_roles`
--
ALTER TABLE `acl_model_has_roles`
  ADD CONSTRAINT `acl_model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `acl_role_has_permissions`
--
ALTER TABLE `acl_role_has_permissions`
  ADD CONSTRAINT `acl_role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `acl_permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `acl_role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bl_articles`
--
ALTER TABLE `bl_articles`
  ADD CONSTRAINT `bl_articles_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `bl_menus` (`id`);

--
-- Constraints for table `bl_articles_tags`
--
ALTER TABLE `bl_articles_tags`
  ADD CONSTRAINT `bl_articles_tags_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `bl_articles` (`id`),
  ADD CONSTRAINT `bl_articles_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `bl_tags` (`id`);

--
-- Constraints for table `ec_attribute_values`
--
ALTER TABLE `ec_attribute_values`
  ADD CONSTRAINT `ec_attribute_values_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `ec_attributes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ec_orders`
--
ALTER TABLE `ec_orders`
  ADD CONSTRAINT `ec_orders_payment_method_id_foreign` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`),
  ADD CONSTRAINT `ec_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `ec_products`
--
ALTER TABLE `ec_products`
  ADD CONSTRAINT `ec_products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `ec_brands` (`id`),
  ADD CONSTRAINT `ec_products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ec_products_labels`
--
ALTER TABLE `ec_products_labels`
  ADD CONSTRAINT `ec_products_labels_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ec_products_labels_product_label_id_foreign` FOREIGN KEY (`product_label_id`) REFERENCES `ec_product_labels` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ec_product_options_values`
--
ALTER TABLE `ec_product_options_values`
  ADD CONSTRAINT `ec_product_options_values_product_option_id_foreign` FOREIGN KEY (`product_option_id`) REFERENCES `ec_product_options` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ec_product_variants`
--
ALTER TABLE `ec_product_variants`
  ADD CONSTRAINT `ec_product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ec_stock_ins`
--
ALTER TABLE `ec_stock_ins`
  ADD CONSTRAINT `ec_stock_ins_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ec_stock_outs`
--
ALTER TABLE `ec_stock_outs`
  ADD CONSTRAINT `ec_stock_outs_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ec_stock_outs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ec_transactions`
--
ALTER TABLE `ec_transactions`
  ADD CONSTRAINT `ec_transactions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `ec_orders` (`id`),
  ADD CONSTRAINT `ec_transactions_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`);

--
-- Constraints for table `ec_variant_attributes`
--
ALTER TABLE `ec_variant_attributes`
  ADD CONSTRAINT `ec_variant_attributes_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `ec_attribute_values` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ec_variant_attributes_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `ec_product_variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users_bank_accounts`
--
ALTER TABLE `users_bank_accounts`
  ADD CONSTRAINT `users_bank_accounts_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_bank_accounts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users_has_types`
--
ALTER TABLE `users_has_types`
  ADD CONSTRAINT `users_has_types_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_has_types_user_type_id_foreign` FOREIGN KEY (`user_type_id`) REFERENCES `users_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users_wallets`
--
ALTER TABLE `users_wallets`
  ADD CONSTRAINT `users_wallets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users_wallets_transactions`
--
ALTER TABLE `users_wallets_transactions`
  ADD CONSTRAINT `users_wallets_transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_wallets_transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `users_wallets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `votes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
