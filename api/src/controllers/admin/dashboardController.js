const db = require('../../config/dbMysql');
const {successResponse, errorResponse} = require("../../utils/response");


exports.getDashboard = async (req, res) => {
    try {
        const [userResult] = await db.query(`SELECT COUNT(*) as totalUsers FROM users`);
        const totalUsers = userResult[0].totalUsers;

        // Lấy tổng số đơn hàng
        const [orderResult] = await db.query(`SELECT COUNT(*) as totalOrders FROM ec_orders`);
        const totalOrders = orderResult[0].totalOrders;

        // Lấy tổng số sản phẩm
        const [productResult] = await db.query(`SELECT COUNT(*) as totalProducts FROM ec_orders`);
        const totalProducts = productResult[0].totalProducts;

        // Lấy tổng số bài viết
        const [articleResult] = await db.query(`SELECT COUNT(*) as totalArticles FROM bl_articles`);
        const totalArticles = articleResult[0].totalArticles;

        return successResponse(res, {
            totalUsers,
            totalOrders,
            totalProducts,
            totalArticles
        });

    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
exports.fetchMonthlyRevenue = async (req, res) => {
    try {
        const query = `
            SELECT 
                MONTH(created_at) AS month,
                SUM(sub_total) AS revenue
            FROM 
                ec_orders
            WHERE 
                YEAR(created_at) = YEAR(CURDATE()) -- Lọc theo năm hiện tại
            GROUP BY 
                MONTH(created_at)
            ORDER BY 
                MONTH(created_at)
        `;

        const [results] = await db.query(query);

        // Tạo cấu trúc dữ liệu cho biểu đồ
        const monthlyRevenueData = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: 'Revenue',
                    data: new Array(12).fill(0) // Khởi tạo mảng 12 phần tử với giá trị 0
                }
            ]
        };

        // Cập nhật doanh thu cho từng tháng từ kết quả truy vấn
        results.forEach(result => {
            const monthIndex = result.month - 1; // Chuyển tháng về chỉ số (0-11)
            monthlyRevenueData.datasets[0].data[monthIndex] = result.revenue;
        });

        // // Trả về dữ liệu biểu đồ doanh thu
        // return res.status(200).json({
        //     status: 'success',
        //     data: monthlyRevenueData
        // });
        return successResponse(res, monthlyRevenueData);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.fetchDailyRevenue = async (req, res) => {
    try {
        const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query;
        if (month < 1 || month > 12 || year < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid month or year'
            });
        }

        // Truy vấn để lấy tổng doanh thu theo từng ngày trong tháng
        const query = `
            SELECT 
                DAY(created_at) AS day,
                SUM(sub_total) AS revenue
            FROM 
                ec_orders
            WHERE 
                MONTH(created_at) = ? AND YEAR(created_at) = ?
            GROUP BY 
                DAY(created_at)
            ORDER BY 
                DAY(created_at)
        `;

        const [results] = await db.query(query, [month, year]);

        // Khởi tạo dữ liệu với các giá trị 0 cho mỗi ngày trong tháng
        const daysInMonth = new Date(year, month, 0).getDate(); // Tính số ngày trong tháng
        const dailyRevenueData = {
            labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Daily Revenue',
                    data: new Array(daysInMonth).fill(0) // Khởi tạo dữ liệu với giá trị 0 cho mỗi ngày
                }
            ]
        };

        // Cập nhật doanh thu cho từng ngày từ kết quả truy vấn
        results.forEach(result => {
            const dayIndex = result.day - 1; // Chuyển ngày về chỉ số (0-based)
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
        // Truy vấn để lấy danh sách đơn hàng mới nhất, giới hạn 10 đơn hàng
        const query = `
            SELECT 
                ec_orders.id, 
                ec_orders.code,  
                users.name AS customer, 
                ec_orders.sub_total AS totalAmount, 
                ec_orders.created_at AS date
            FROM 
                ec_orders
            JOIN 
                users ON ec_orders.user_id = users.id -- Giả sử có cột user_id trong bảng ec_orders để liên kết với bảng users
            ORDER BY 
                ec_orders.created_at DESC
            LIMIT 10
        `;
        const [newOrders] = await db.query(query);

        return res.status(200).json({
            status: 'success',
            data: newOrders
        });
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.fetchNewMembers = async (req, res) => {
    try {
        // Truy vấn để lấy danh sách thành viên mới nhất, giới hạn 10 người
        const query = `
            SELECT id, name, email, created_at AS joinedDate
            FROM users
            ORDER BY created_at DESC
            LIMIT 10
        `;
        const [newMembers] = await db.query(query);

        return res.status(200).json({
            status: 'success',
            data: newMembers
        });
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
