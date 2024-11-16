const mysql = require('mysql2/promise');

// Tạo connection pool để quản lý kết nối
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, // Số lượng kết nối tối đa
    queueLimit: 0
});

module.exports = pool;
