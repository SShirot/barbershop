const db = require('../config/dbMysql'); // Đảm bảo bạn đã thiết lập kết nối DB ở file này

const Category = {
    tableName: 'categories',  // Tên bảng

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        name: 'varchar(255)',
        slug: 'varchar(255)',
        avatar: 'varchar(255)',
        icon: 'varchar(255)',
        status: "enum('published', 'draft', 'pending') DEFAULT 'pending'",
        description: 'varchar(255)',
        parent_id: 'int(11) DEFAULT 0',
        title_seo: 'varchar(255)',
        description_seo: 'varchar(255)',
        keywords_seo: 'varchar(255)',
        index_seo: 'tinyint(4) DEFAULT 1',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    // Phương thức để lấy danh sách danh mục với phân trang và tìm kiếm
    getAll: async (page = 1, pageSize = 10, name = null) => {
        const offset = (Number(page) - 1) * Number(pageSize);
        let query = `SELECT * FROM ${Category.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${Category.tableName}`;
        const queryParams = [];

        // Thêm điều kiện tìm kiếm nếu có
        if (name) {
            query += ' WHERE name LIKE ?';
            countQuery += ' WHERE name LIKE ?';
            queryParams.push(`%${name}%`);
        }
		console.log(Number(pageSize ), offset);
        // Thêm phân trang vào truy vấn
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(Number(pageSize || 10), offset);

        // Thực hiện truy vấn để lấy dữ liệu và đếm tổng số hàng
        const [rows] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, name ? [`%${name}%`] : []);
        const total = countResult[0].total;

        // Trả về kết quả bao gồm dữ liệu và meta
        return {
            data: rows,
            meta: {
                total,
                perPage: pageSize,
                currentPage: page,
                lastPage: Math.ceil(total / pageSize),
                page_size: pageSize,
                total_page: Math.ceil(total / pageSize),
            }
        };
    },

    // Phương thức tìm category theo ID
    findById: async function (id) {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },
    findBySlug: async function (slug) {
        const query = `SELECT * FROM ${this.tableName} WHERE slug = ? LIMIT 1`;
        const [rows] = await db.query(query, [slug]);
        return rows?.length > 0 ? rows[0] : null;
    },
    // Phương thức tạo mới category
    create: async function (categoryData) {
        const query = `
            INSERT INTO ${this.tableName} 
            (name, slug, avatar, icon, status, description, parent_id, title_seo, description_seo, keywords_seo, index_seo) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            categoryData.name,
            categoryData.slug,
            categoryData.avatar || null,
            categoryData.icon || null,
            categoryData.status || 'pending',
            categoryData.description || null,
            categoryData.parent_id || 0,
            categoryData.title_seo || null,
            categoryData.description_seo || null,
            categoryData.keywords_seo || null,
            categoryData.index_seo || 1
        ];

        const [result] = await db.query(query, values);

        // Lấy dữ liệu category mới tạo bằng id
        return await this.findById(result.insertId);
    },
    // Phương thức cập nhật category theo ID
    updateById: async function (id, updateData) {
        const query = `
            UPDATE ${this.tableName} 
            SET name = ?, slug = ?, avatar = ?, icon = ?, status = ?, description = ?, parent_id = ?, 
                title_seo = ?, description_seo = ?, keywords_seo = ?, index_seo = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.avatar || null,
            updateData.icon || null,
            updateData.status || 'pending',
            updateData.description || null,
            updateData.parent_id || 0,
            updateData.title_seo || null,
            updateData.description_seo || null,
            updateData.keywords_seo || null,
            updateData.index_seo || 1,
            id
        ];

        const [result] = await db.query(query, values);

        // Kiểm tra xem có hàng nào được cập nhật không
        if (result.affectedRows === 0) {
            return null; // Nếu không có, trả về null
        }

        // Lấy lại thông tin category đã cập nhật
        return await this.findById(id);
    },

    // Phương thức xóa category theo ID
    deleteById: async function (id) {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);

        // Kiểm tra xem có hàng nào được xóa không
        return result.affectedRows > 0;
    }
};

module.exports = Category;
