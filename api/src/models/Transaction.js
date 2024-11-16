const Transaction = {
    tableName: 'ec_transactions',  // Tên bảng

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        order_id: 'bigint(20) UNSIGNED',
        product_id: 'bigint(20) UNSIGNED',
        qty: 'int(11) DEFAULT 1',
        price: 'bigint(20) DEFAULT 0',
        total_price: 'bigint(20) DEFAULT 0',
        status: 'varchar(255) DEFAULT "pending"',
        created_at: 'timestamp NULL',
        updated_at: 'timestamp NULL'
    }
};

module.exports = Transaction;
