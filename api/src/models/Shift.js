const Shift = {
    tableName: 'shifts',
    columns: {
        id: 'SERIAL PRIMARY KEY',
        name: 'VARCHAR(50) NOT NULL',
        start_time: 'TIME NOT NULL',
        end_time: 'TIME NOT NULL'
    }
};

module.exports = Shift; 