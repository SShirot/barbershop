const express = require('express');
const mysql = require('mysql2/promise');
const swaggerSetup = require('./config/swagger');
require('dotenv').config(); // Load environment variables
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Cho phép mọi nguồn truy cập
    },
});

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Kết nối
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
    connection.release(); // Giải phóng kết nối sau khi sử dụng
});

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors()); // Thêm dòng này

// Define Routes
app.use('/api/v1', require('./routes'));
app.use('/api/v1/uploads', require('./routes/base/upload'));
app.use('/uploads/images', express.static('uploads/images'));
app.use('/api/orders', require('./routes/user/order'));

// Setup Swagger
swaggerSetup(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
