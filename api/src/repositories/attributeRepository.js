const db = require('../config/dbMysql');

const AttributeRepository = {
    tableName: 'ec_attributes',
    valueTableName: 'ec_attribute_values',
    // Lấy tất cả các thuộc tính (hỗ trợ phân trang và tìm kiếm theo tên)
    getAll: async (offset = 0, pageSize = 10, name = null) => {
        let query = `SELECT * FROM ${AttributeRepository.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${AttributeRepository.tableName}`;
        const queryParams = [];

        if (name) {
            query += ' WHERE name LIKE ?';
            countQuery += ' WHERE name LIKE ?';
            queryParams.push(`%${name}%`);
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const [rows] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, name ? [`%${name}%`] : []);
        const total = countResult[0].total;



        const attributeIds = rows.map(attr => attr.id);
        let values = [];
        if (attributeIds.length > 0) {
            const valuesQuery = `
            SELECT * 
            FROM ${AttributeRepository.valueTableName}
            WHERE attribute_id IN (?)
        `;
            const [valuesResult] = await db.query(valuesQuery, [attributeIds]);
            values = valuesResult;
        }

        // Gắn danh sách values vào từng attribute
        const data = rows.map(attribute => {
            const relatedValues = values.filter(value => value.attribute_id === attribute.id);
            return {
                ...attribute,
                values: relatedValues,
            };
        });

        return { data, total };
    },

    // Tìm thuộc tính theo ID
    findById: async (id) => {
        const query = `SELECT * FROM ${AttributeRepository.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },

    // Tạo mới một thuộc tính
    create: async (attributeData) => {
        const query = `
            INSERT INTO ${AttributeRepository.tableName} (name, slug, status, created_at, updated_at) 
            VALUES (?, ?, ?, NOW(), NOW())`;
        const values = [
            attributeData.name,
            attributeData.slug,
            attributeData.status || 'pending',
        ];
        const [result] = await db.query(query, values);
        const attributeId = result.insertId;
        if(attributeData.values && attributeData.values.length > 0) {
            await AttributeRepository.createValues(attributeId, attributeData.values);
        }

        return attributeId;
    },
    createValues: async (attributeId, values) => {
        const query = `
            INSERT INTO ${AttributeRepository.valueTableName} 
            (attribute_id, title, is_default, color, image, slug, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;
        for (const value of values) {
            const slug = value.title.toLowerCase().replace(/\s+/g, '-');
            await db.query(query, [
                attributeId,
                value.title,
                value.is_default ? 1 : 0,
                value.color || null,
                value.image || null,
                slug,
            ]);
        }
    },
    deleteValuesByAttributeId: async (attributeId) => {
        const query = `DELETE FROM ${AttributeRepository.valueTableName} WHERE attribute_id = ?`;
        await db.query(query, [attributeId]);
    },
    createWithValues: async (attributeData) => {
        // Tạo thuộc tính mới
        const attributeId = await AttributeRepository.create(attributeData);
        // Nếu có values, thêm vào bảng ec_attribute_values
        if (attributeData.values && attributeData.values.length > 0) {
            await AttributeRepository.createValues(attributeId, attributeData.values);
        }
        return attributeId;
    },
    // Cập nhật thuộc tính và giá trị
    updateWithValues: async (id, updateData) => {
        // Cập nhật thuộc tính
        const updateAttribute = await AttributeRepository.updateById(id, updateData);
        // Xóa các giá trị cũ liên quan
        await AttributeRepository.deleteValuesByAttributeId(id);
        // Thêm các giá trị mới
        if (updateData.values && updateData.values.length > 0) {
            await AttributeRepository.createValues(id, updateData.values);
        }
        return updateAttribute;
    },

    // Cập nhật thuộc tính theo ID
    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${AttributeRepository.tableName} 
            SET name = ?, slug = ?, status = ?, updated_at = NOW()
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.status || 'pending',
            id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0;
    },

    // Xóa thuộc tính theo ID
    deleteById: async (id) => {
        const query = `DELETE FROM ${AttributeRepository.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = AttributeRepository;
