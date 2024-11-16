const Rating = {
    tableName: 'ratings',  // Tên bảng

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        user_id: 'bigint(20) UNSIGNED',
        service_id: 'bigint(20) UNSIGNED NULL',  // Có thể null nếu là đánh giá sản phẩm
        product_id: 'bigint(20) UNSIGNED NULL',  // Có thể null nếu là đánh giá dịch vụ
        rating: 'tinyint(1) NOT NULL',  // Điểm đánh giá từ 1 đến 5
        comment: 'text',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    }
};

module.exports = Rating;
