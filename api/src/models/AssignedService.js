const AssignedService = {
    tableName: 'assigned_services',
    columns: {
        id: 'BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        services_user_id: 'BIGINT UNSIGNED NOT NULL',
        staff_id: 'BIGINT UNSIGNED NOT NULL',
        schedule_id: 'BIGINT UNSIGNED NOT NULL',
        assigned_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        note: 'TEXT'
    },
    foreignKeys: [
        {
            column: 'services_user_id',
            references: 'services_user(id)',
            onDelete: 'CASCADE'
        },
        {
            column: 'staff_id',
            references: 'users(id)',
            onDelete: 'CASCADE'
        },
        {
            column: 'schedule_id',
            references: 'work_schedule(id)',
            onDelete: 'CASCADE'
        }
    ]
};

module.exports = AssignedService; 