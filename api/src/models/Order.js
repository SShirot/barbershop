const Order = {
    tableName: 'ec_orders',  // Tên bảng

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        user_id: 'bigint(20) UNSIGNED',
        payment_method_id: 'bigint(20) UNSIGNED',
        code: 'varchar(255)',
        total_shipping_fee: 'bigint(20)',
        payment_status: "enum('pending', 'completed', 'refunding', 'refunded') DEFAULT 'pending'",
        status: "enum('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending'",
        coupon_code: 'varchar(255) NULL',
        amount: 'decimal(16,2)',  // Tổng tiền hàng
        shipping_amount: 'decimal(16,2)',  // Tiền ship
        tax_amount: 'decimal(16,2)',  // Tiền thuế
        discount_amount: 'decimal(16,2)',  // Tiền giảm giá
        sub_total: 'decimal(16,2)',  // Tổng tiền
        completed_at: 'datetime NULL',
        notes: 'text NULL',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    }
};

module.exports = Order;
