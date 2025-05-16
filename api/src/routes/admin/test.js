const express = require('express');
const router = express.Router();
const db = require('../../config/dbMysql'); // Đảm bảo đúng đường dẫn tới config DB
const  verifyToken  = require('../../middleware/auth');
// ✅ Route GET /admin/assigned-services/services-user
router.get('/services-users', verifyToken, async (req, res) => {
  try {
    // 🔍 Truy vấn chi tiết từ bảng services_user
    const query = `
      SELECT 
        su.*,
        s.name AS service_name,
        s.price AS service_price,
        u.name AS user_name,
        u.email AS user_email,
        u.phone AS user_phone,
        staff.name AS staff_name
      FROM services_user su
      LEFT JOIN services s ON su.service_id = s.id
      LEFT JOIN users u ON su.user_id = u.id
      LEFT JOIN users staff ON su.staff_id = staff.id;
    `;
    
    const [rows] = await db.query(query); 

    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách đăng ký dịch vụ thành công',
      data: rows,
      meta: {
        total: rows.length,
      }
    });
  } catch (error) {
    console.error('❌ Lỗi khi truy vấn:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi máy chủ',
    });
  }
});

module.exports = router;
