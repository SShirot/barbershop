-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 04, 2024 at 11:28 PM
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
(1, 'all', 'api', 'all', 'Toàn quyền', '2024-10-20 03:47:11', '2024-10-20 03:47:11'),
(2, 'product_index', 'api', 'product_index', 'Danh sách sản phẩm', '2024-10-20 03:47:11', '2024-10-20 03:47:11');

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
(1, 'administrator', 'api', 'Toàn quyền', '2024-10-20 03:47:11', '2024-10-20 03:47:11'),
(2, 'manage', 'api', 'Quản lý', '2024-10-20 03:47:11', '2024-10-20 03:47:11'),
(3, 'general_director', 'api', 'Tổng giám đốc', '2024-10-20 03:47:11', '2024-10-20 03:47:11'),
(4, 'staff', 'api', 'Nhân viên', '2024-10-20 03:47:11', '2024-10-20 03:47:11');

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

--
-- Dumping data for table `bl_articles`
--

INSERT INTO `bl_articles` (`id`, `name`, `slug`, `description`, `content`, `status`, `author_id`, `menu_id`, `is_featured`, `avatar`, `views`, `created_at`, `updated_at`) VALUES
(4, 'ĐỘC QUYỀN WEBSITE - VOUCHER 100K CHO KHÁCH HÀNG ĐĂNG KÍ EMAIL', NULL, 'adadadadada', '<p>Nội dung1212</p>', 'pending', NULL, 4, 0, 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/4.%20%C4%90%C4%82NG%20K%C3%8D%20TH%C3%94NG%20TIN.jpg', 0, '2024-10-20 03:47:11', NULL),
(7, 'Tặng ngay Voucher 25K cho khách hàng Follow Zalo YODY trong tháng 10', NULL, 'Ưu đãi cực Hot trong tháng 10, chỉ cần quý khách thao tác theo dõi kênh Zalo OA của YODY sẽ được nhận ngay Voucher giảm giá', '<p>Nội dung</p>', 'pending', NULL, 3, 0, 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/2.%20ZALO%20YODY%2050K.jpg', 0, '2024-10-27 05:42:41', NULL),
(8, 'Ưu đãi lớn nhất năm 2024 - SALE CUỐI MÙA LÊN ĐẾN 50%', NULL, 'Quý khách có thể thực hiện mua sắm trực tiếp tại hệ thống Online Yody bao gồm Website, Fanpge, Zalo OA hoặc trực tiếp tại hơn 270 cửa hàng YODY trên toàn quốc.', '<p>Nội dung</p>', 'pending', NULL, 4, 0, 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-sale-cuoi-mua.png', 0, '2024-10-27 05:42:41', NULL),
(11, 'ĐỘC QUYỀN WEBSITE - VOUCHER 100K CHO KHÁCH HÀNG ĐĂNG KÍ EMAIL', NULL, 'Thời gian nhận và sử dụng mã khuyến mãi kéo dài từ ngày 01/10/2024 đến ngày 31/10/2024. Sau khi nhận mã, khách hàng sẽ sử dụng trực tiếp để mua hàng trên Website (không áp dụng tại cửa hàng).', '<p>Nội dung</p>', 'pending', NULL, 3, 0, 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/4.%20%C4%90%C4%82NG%20K%C3%8D%20TH%C3%94NG%20TIN.jpg', 0, NULL, NULL),
(13, '1212121', NULL, '21', '<p>12212121</p>', 'pending', NULL, 3, 0, 'http://localhost:3014/uploads/images/264f3cbf-b3e6-49c0-9e4b-3bfe4b18a32f.png', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bl_articles_tags`
--

CREATE TABLE `bl_articles_tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `article_id` bigint(20) UNSIGNED NOT NULL,
  `tag_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bl_articles_tags`
--

INSERT INTO `bl_articles_tags` (`id`, `article_id`, `tag_id`) VALUES
(15, 7, 11),
(16, 7, 4);

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

--
-- Dumping data for table `bl_menus`
--

INSERT INTO `bl_menus` (`id`, `name`, `slug`, `description`, `status`, `is_featured`, `created_at`, `updated_at`) VALUES
(1, 'Check 2', NULL, 'Check 2', 'pending', 0, '2024-10-20 03:47:11', NULL),
(2, 'Thời trang thế giới', 'thoi-trang-the-gioi', 'Thời trang thế giới', 'published', 1, '2024-10-20 03:47:11', NULL),
(3, 'Đồng phục', 'dong-phuc', 'Đồng phục', 'published', 1, '2024-10-20 03:47:11', NULL),
(4, 'Tin tức thời trang', NULL, 'Tin tức thời trang', 'published', 1, '2024-10-25 02:53:11', NULL);

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

--
-- Dumping data for table `bl_tags`
--

INSERT INTO `bl_tags` (`id`, `name`, `slug`, `description`, `status`, `is_featured`, `created_at`, `updated_at`) VALUES
(1, 'thời trang nổi bật', NULL, 'thời trang nổi bật', 'published', 1, '2024-10-20 03:47:11', NULL),
(2, 'xu thế mới', NULL, 'xu thế mới', 'published', 1, '2024-10-20 03:47:11', NULL),
(3, 'Đồng phục', NULL, 'Đồng phục', 'published', 1, '2024-10-20 03:47:11', NULL),
(4, 'thời trang nổi bật', NULL, 'thời trang nổi bật', 'published', 1, '2024-10-25 02:58:38', NULL),
(5, 'xu hướng', NULL, 'xu hướng', 'published', 1, '2024-10-25 02:58:38', NULL),
(6, 'thoáng mát', NULL, 'thoáng mát', 'published', 1, '2024-10-25 02:58:38', NULL),
(7, 'thời trang nổi bật', NULL, 'thời trang nổi bật', 'published', 1, '2024-10-25 03:12:45', NULL),
(8, 'xu hướng', NULL, 'xu hướng', 'published', 1, '2024-10-25 03:12:45', NULL),
(9, 'thoáng mát', NULL, 'thoáng mát', 'published', 1, '2024-10-25 03:12:45', NULL),
(11, 'xu hướng', 'xu-huong', 'xu hướng', 'published', 1, '2024-10-25 20:51:50', NULL),
(12, 'thoáng mát', 'thoang-mat', 'thoáng mát', 'published', 1, '2024-10-25 20:51:50', NULL),
(14, '2212', NULL, '2121211', 'pending', 0, NULL, NULL);

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
(5, 'Phụ kiện', NULL, NULL, NULL, 'pending', 'Mô tả cập nhật', 0, NULL, NULL, NULL, 1, '2024-10-20 03:47:11', NULL),
(7, 'Áo nam', NULL, NULL, NULL, 'pending', 'Áo nam mới', 0, NULL, NULL, NULL, 1, '2024-10-25 01:47:55', NULL),
(8, 'Áo nữ', NULL, NULL, NULL, 'pending', 'Áo nữ mới', 0, NULL, NULL, NULL, 1, '2024-10-25 01:47:55', NULL),
(10, 'Quần nữ', NULL, NULL, NULL, 'pending', 'Quần nữ', 0, NULL, NULL, NULL, 1, '2024-10-25 01:47:55', NULL),
(11, 'Đầm', NULL, NULL, NULL, 'pending', 'Đầm mô tả', 0, NULL, NULL, NULL, 1, '2024-10-25 01:47:55', NULL),
(12, 'Áo sơ mi', 'ao-so-mi', NULL, NULL, 'pending', NULL, 0, NULL, NULL, NULL, 1, '2024-10-25 01:47:55', NULL),
(13, 'Áo phông', 'ao-phong', NULL, NULL, 'pending', NULL, 0, NULL, NULL, NULL, 1, '2024-10-25 01:47:55', NULL),
(14, 'Áo khoác', 'ao-khoac', NULL, NULL, 'pending', NULL, 0, NULL, NULL, NULL, 1, '2024-10-25 01:47:55', NULL),
(15, 'Đồ thể thao', 'do-the-thao', NULL, NULL, 'pending', NULL, 0, NULL, NULL, NULL, 1, '2024-10-25 01:47:55', NULL);

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
(1, 'Chanel', 'chanel', 'https://cdn-copck.nitrocdn.com/WwybsgZzWtFojdWowVAajDJCKuMAXRVm/assets/images/optimized/rev-327d879/rubicmarketing.com/wp-content/uploads/2022/11/logo-chanel.jpg', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-20 03:47:11', NULL),
(2, 'Gucci', 'gucci', 'https://inkythuatso.com/uploads/thumbnails/800/2021/11/gucci-logo-inkythuatso-01-02-10-02-14.jpg', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-20 03:47:11', NULL),
(3, 'Zara', 'zara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1280px-Zara_Logo.svg.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 01:50:40', NULL),
(4, 'H&M', 'hm', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 01:50:40', NULL),
(5, 'Adidas', 'adidas', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 01:50:40', NULL),
(6, 'Nike', 'nike', 'https://img.favpng.com/25/2/1/swoosh-nike-logo-just-do-it-adidas-png-favpng-KMjV5sizT4FG7v09BEnKe7mRA.jpg', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 01:50:40', NULL),
(7, 'Levi\'s', 'levis', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Levi%27s_logo.svg/2560px-Levi%27s_logo.svg.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 01:50:40', NULL),
(8, 'Puma', 'puma', 'https://www.logodesignvalley.com/blog/wp-content/uploads/2023/05/puma-2.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 01:50:40', NULL),
(9, 'Balenciage', 'balenciage', 'https://bizweb.dktcdn.net/thumb/grande/100/106/923/products/balenciaga-logo-3.png?v=1617552563317', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 01:50:40', NULL),
(10, 'Yody', 'yody', 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Yody.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 01:50:40', NULL);

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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_products`
--

INSERT INTO `ec_products` (`id`, `name`, `slug`, `description`, `avatar`, `status`, `number`, `price`, `sale`, `contents`, `length`, `width`, `height`, `category_id`, `brand_id`, `created_at`, `updated_at`) VALUES
(1, 'Đồ Bộ Nam Phối Dây Dệt', 'do-bo-nam-phoi-day-det', 'Mô tả sản phẩm', 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/bo-do-nam-phoi-day-det-yody-bdm7011-nau-2.jpg', 'pending', 0, 200000, 0, 'Nội dung', NULL, NULL, NULL, 5, NULL, '2024-10-20 03:47:11', NULL),
(5, 'Đầm dã hội mới', NULL, NULL, 'http://localhost:3014/uploads/images/ee3dd336-ef5f-4cf8-9caa-54b2a3162cef.jpg', 'pending', 0, 900000, 0, NULL, NULL, NULL, NULL, 11, NULL, NULL, NULL);

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
(1, 1, 1, '2024-10-20 03:47:11', NULL),
(10, 5, 1, NULL, NULL),
(11, 5, 2, NULL, NULL);

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
(1, 'New', 'Sản phẩm mới', 'new', 0, 'published', '2024-10-20 03:47:11', NULL),
(2, 'Hot', 'Sản phẩm nổi bật', 'hot', 0, 'published', '2024-10-20 03:47:11', NULL),
(3, 'Sale 1', 'Sản phẩm khuyến mãi 2', 'sale 2', 0, 'published', NULL, NULL);

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
-- Table structure for table `ec_stock_ins`
--

CREATE TABLE `ec_stock_ins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) DEFAULT '0',
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_stock_ins`
--

INSERT INTO `ec_stock_ins` (`id`, `product_id`, `quantity`, `price`, `date`, `created_at`, `updated_at`) VALUES
(1, 1, 10, 10000, '2024-10-28', '2024-10-28 09:18:40', '2024-10-28 09:18:40'),
(2, 1, 30, 30000, '2024-10-28', '2024-10-28 09:32:56', '2024-10-28 09:32:56');

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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ec_stock_outs`
--

INSERT INTO `ec_stock_outs` (`id`, `product_id`, `quantity`, `price`, `user_id`, `date`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 20000, 1, '2024-10-28', '2024-10-28 09:18:57', '2024-10-28 09:18:57'),
(2, 1, 3, 20000, 1, '2024-10-28', '2024-10-28 09:32:08', '2024-10-28 09:32:08');

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
(33, '2014_10_12_000000_create_users_table', 1),
(34, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(35, '2019_08_19_000000_create_failed_jobs_table', 1),
(36, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(37, '2024_08_24_073329_create_products_table', 1),
(38, '2024_09_29_001703_create_permission_tables', 1),
(39, '2024_10_13_163624_create_csdl_base_module_admin', 1),
(40, '2024_10_15_155633_create_csdl_blogs_module_admin', 1);

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
(1, 'VND', 'COD', NULL, 'Nhận hàng thanh toán', 1, 'active', NULL, '2024-10-20 03:47:11', NULL);

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

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'MyApp', 'e88cb3d3fe9007e3e07a4e0691fe2b9febe38a4904b09cee57e12d61df341204', '[\"*\"]', '2024-10-27 05:54:58', NULL, '2024-10-24 23:58:56', '2024-10-27 05:54:58'),
(2, 'App\\Models\\User', 1, 'MyApp', '40582587078b7bba038b6a1ed450ba40d95b0b890dc8d80f1bb1fad33c591fbb', '[\"*\"]', '2024-11-02 05:08:09', NULL, '2024-10-25 21:25:40', '2024-11-02 05:08:09');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(9, 'Sản phẩm thông minh', 'Bộ sưu tập ưu đãi mùa đông 2024', 1, 'home', 'https://123code.net', 'https://flone.jamstacktemplates.dev/assets/img/slider/single-slide-hm1-2.png', 'published', '2024-10-25 02:41:41', NULL),
(10, 'MCN', 'Bộ sưu tập ưu đãi mùa đông 2024', 1, 'home', 'https://123code.net', 'http://localhost:3014/uploads/images/d2c96f28-ab40-4b6f-8896-e17487441b93.png', 'pending', '2024-10-25 02:41:41', NULL);

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
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `phone`, `provider`, `provider_id`, `status`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'ADMIN', 'admin@gmail.com', NULL, '$2y$12$w5.p9RDFwrnZJ0LMJEgdJuzSM8R3LajfSxiVGUWkbjyHFkqcW7p8W', '0986420994', NULL, NULL, 1, NULL, NULL, '2024-10-20 03:47:10', '2024-10-20 03:47:10'),
(2, 'John Doe', 'johndoe@example.com', NULL, '$2a$10$byza/A/vX7SCxPZOmLfvGOf05YPOhnPjDUO5iboWGWf.HUx9QSiPS', NULL, NULL, NULL, 1, 'https://via.placeholder.com/150', NULL, NULL, NULL),
(3, 'Phu DZ', 'adada@gmail.com', NULL, '$2a$10$xFPuodkPC0/7u2pAsC1tNe7aNGWPQGbwNlViMIPer78j2Y3EOIC06', NULL, NULL, NULL, 1, 'https://via.placeholder.com/150', NULL, NULL, NULL),
(4, 'Phú Phan', 'codethue9402@gmail.com', NULL, '$2a$10$tai56eo5T0CB1DY9uywD1OQjN7H2/k26Ba0sJuPbamNpUA.B8MSY.', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(5, 'Phú Phan', 'admin1@gmail.com', NULL, '$2a$10$gYJXilaWEcbO8B0YkUPAG.ksc/LLLuutg5MH2Ch77ujZ1wyBPQGQa', NULL, NULL, NULL, 1, 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/464175296_2853626261443243_7907192900884540576_n.jpg', NULL, NULL, NULL),
(6, 'Phú Phan', 'admin2@gmail.com', NULL, '$2a$10$XdpPkBpM6tZTMWghviq7vOzzrNSkNc8pHa19xZt38eWxmzQ.E13I6', NULL, NULL, NULL, 1, 'http://localhost:3014/uploads/images/c2e72f2a-a018-4199-97bb-dabf9187393a.jpg', NULL, NULL, NULL);

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
(1, 'ADMIN', '2024-10-20 03:47:09', '2024-10-20 03:47:09'),
(2, 'USER', '2024-10-20 03:47:09', '2024-10-20 03:47:09'),
(3, 'SYSTEM', '2024-10-20 03:47:09', '2024-10-20 03:47:09');

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
-- Table structure for table `variant_attributes`
--

CREATE TABLE `variant_attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `variant_id` bigint(20) UNSIGNED NOT NULL,
  `attribute_value_id` bigint(20) UNSIGNED NOT NULL,
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
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `slides`
--
ALTER TABLE `slides`
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
-- Indexes for table `variant_attributes`
--
ALTER TABLE `variant_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `variant_attributes_variant_id_foreign` (`variant_id`),
  ADD KEY `variant_attributes_attribute_value_id_foreign` (`attribute_value_id`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `bl_articles_tags`
--
ALTER TABLE `bl_articles_tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `bl_menus`
--
ALTER TABLE `bl_menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bl_tags`
--
ALTER TABLE `bl_tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ec_attributes`
--
ALTER TABLE `ec_attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ec_attribute_values`
--
ALTER TABLE `ec_attribute_values`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ec_brands`
--
ALTER TABLE `ec_brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ec_orders`
--
ALTER TABLE `ec_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ec_products`
--
ALTER TABLE `ec_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ec_products_labels`
--
ALTER TABLE `ec_products_labels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- AUTO_INCREMENT for table `ec_stock_ins`
--
ALTER TABLE `ec_stock_ins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ec_stock_outs`
--
ALTER TABLE `ec_stock_outs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ec_transactions`
--
ALTER TABLE `ec_transactions`
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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slides`
--
ALTER TABLE `slides`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- AUTO_INCREMENT for table `variant_attributes`
--
ALTER TABLE `variant_attributes`
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
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `variant_attributes`
--
ALTER TABLE `variant_attributes`
  ADD CONSTRAINT `variant_attributes_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `ec_attribute_values` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `variant_attributes_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
