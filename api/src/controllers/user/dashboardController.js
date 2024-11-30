const db = require('../../config/dbMysql');
const { successResponse, errorResponse } = require("../../utils/response");

exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy ID user từ middleware auth

        // Lấy tổng số đơn hàng của user
        const [orderResult] = await db.query(`
            SELECT COUNT(*) as totalOrders 
            FROM ec_orders 
            WHERE user_id = ?`, [userId]);
        const totalOrders = orderResult[0].totalOrders;

        const [serviceResult] = await db.query(`
            SELECT COUNT(*) as total 
            FROM services_user 
            WHERE user_id = ?`, [userId]);
        const totalService = serviceResult[0].total;


        return successResponse(res, {
            totalOrders,
            totalService
        });
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.fetchMonthlyRevenue = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy ID user từ middleware auth

        const query = `
            SELECT 
                MONTH(created_at) AS month,
                SUM(sub_total) AS revenue
            FROM 
                ec_orders
            WHERE 
                YEAR(created_at) = YEAR(CURDATE()) AND user_id = ? -- Thêm điều kiện user_id
            GROUP BY 
                MONTH(created_at)
            ORDER BY 
                MONTH(created_at)
        `;

        const [results] = await db.query(query, [userId]);

        const monthlyRevenueData = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: 'Revenue',
                    data: new Array(12).fill(0) // Khởi tạo mảng 12 phần tử với giá trị 0
                }
            ]
        };

        results.forEach(result => {
            const monthIndex = result.month - 1;
            monthlyRevenueData.datasets[0].data[monthIndex] = result.revenue;
        });

        return successResponse(res, monthlyRevenueData);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.fetchDailyRevenue = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy ID user từ middleware auth
        const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query;

        const query = `
            SELECT 
                DAY(created_at) AS day,
                SUM(sub_total) AS revenue
            FROM 
                ec_orders
            WHERE 
                MONTH(created_at) = ? AND YEAR(created_at) = ? AND user_id = ?
            GROUP BY 
                DAY(created_at)
            ORDER BY 
                DAY(created_at)
        `;

        const [results] = await db.query(query, [month, year, userId]);

        const daysInMonth = new Date(year, month, 0).getDate();
        const dailyRevenueData = {
            labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Daily Revenue',
                    data: new Array(daysInMonth).fill(0) // Khởi tạo dữ liệu với giá trị 0
                }
            ]
        };

        results.forEach(result => {
            const dayIndex = result.day - 1;
            dailyRevenueData.datasets[0].data[dayIndex] = result.revenue;
        });

        return successResponse(res, dailyRevenueData);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.fetchNewOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy ID user từ middleware auth

        const query = `
            SELECT 
                ec_orders.id, 
                ec_orders.code,  
                ec_orders.sub_total AS totalAmount, 
                ec_orders.created_at AS date
            FROM 
                ec_orders
            WHERE 
                user_id = ? -- Thêm điều kiện user_id
            ORDER BY 
                created_at DESC
            LIMIT 10
        `;

        const [newOrders] = await db.query(query, [userId]);

        return successResponse(res, newOrders);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
