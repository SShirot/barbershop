const WorkSchedule = {
    tableName: 'work_schedule',
    columns: {
        id: 'BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        staff_id: 'BIGINT UNSIGNED NOT NULL',
        work_date: 'DATE NOT NULL',
        shift_id: 'BIGINT UNSIGNED NOT NULL',
        status: "VARCHAR(20) DEFAULT 'pending'",
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },
    foreignKeys: [
        {
            column: 'staff_id',
            references: 'users(id)',
            onDelete: 'CASCADE'
        },
        {
            column: 'shift_id',
            references: 'shifts(id)',
            onDelete: 'CASCADE'
        }
    ],
    uniqueConstraints: [
        ['staff_id', 'work_date', 'shift_id']
    ]
};

module.exports = WorkSchedule; 