
const Appointment = {
    tableName: 'appointments',  // Tên bảng

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        user_id: 'bigint(20) UNSIGNED',  // ID người dùng
        service_id: 'bigint(20) UNSIGNED',  // ID dịch vụ
        appointment_time: 'timestamp',  // Thời gian đặt lịch cắt tóc
        status: "enum('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending'",  // Trạng thái lịch
        notes: 'text NULL',  // Ghi chú từ người dùng, có thể để trống
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    }
};

module.exports = Appointment;
