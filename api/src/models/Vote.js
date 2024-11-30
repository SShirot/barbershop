const db = require('../config/dbMysql'); // Kết nối với MySQL

const Vote = {
    tableName: 'votes',

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        comment: 'text',
        rating: 'int(11) DEFAULT 0',
        product_id: 'bigint(20) UNSIGNED',
        user_id: 'bigint(20) UNSIGNED',
        status: "enum('published', 'draft', 'pending') DEFAULT 'pending'",
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    // Lấy danh sách vote với phân trang và tìm kiếm theo product_id và user_id
    getAll: async (page = 1, pageSize = 10, productId = null, userId = null) => {
        const offset = (page - 1) * pageSize;
        let query = `
            SELECT votes.*, ec_products.name AS product_name, users.name AS user_name, users.email AS user_email
            FROM ${Vote.tableName}
            LEFT JOIN ec_products ON votes.product_id = ec_products.id
            LEFT JOIN users ON votes.user_id = users.id
        `;
        let countQuery = `SELECT COUNT(*) as total FROM ${Vote.tableName}`;
        const queryParams = [];

        const conditions = [];
        if (productId) {
            conditions.push('votes.product_id = ?');
            queryParams.push(productId);
        }
        if (userId) {
            conditions.push('votes.user_id = ?');
            queryParams.push(userId);
        }

        if (conditions.length > 0) {
            const whereClause = ' WHERE ' + conditions.join(' AND ');
            query += whereClause;
            countQuery += whereClause;
        }

        query += ' ORDER BY votes.created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const [rows] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, queryParams.slice(0, -2)); // Không truyền offset và limit vào countQuery
        const total = countResult[0].total;

        return {
            data: rows,
            meta: {
                total,
                perPage: pageSize,
                page_size: pageSize,
                currentPage: page,
                page,
                lastPage: Math.ceil(total / pageSize),
                total_page: Math.ceil(total / pageSize),
            }
        };
    },

    // Lấy vote theo ID
    findById: async (id) => {
        const query = `
            SELECT votes.*, ec_products.name AS product_name, users.name AS user_name, users.email AS user_email
            FROM ${Vote.tableName}
            LEFT JOIN ec_products ON votes.product_id = ec_products.id
            LEFT JOIN users ON votes.user_id = users.id
            WHERE votes.id = ? LIMIT 1
        `;
        const [rows] = await db.query(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    },

    // Tạo mới vote
    create: async (voteData) => {
        const checkQuery = `
            SELECT id FROM ${Vote.tableName} 
            WHERE product_id = ? AND user_id = ?
            LIMIT 1
        `;
        const [existingVotes] = await db.query(checkQuery, [voteData.product_id, voteData.user_id]);

        // Nếu đã tồn tại đánh giá từ user này cho sản phẩm này, trả về null hoặc thông báo lỗi
        if (existingVotes.length > 0) {
            return { status: 'already_reviewed' };
        }
        let imagesJSON = null;
        if(voteData.images)
            imagesJSON = JSON.stringify(voteData.images);

        const query = `
            INSERT INTO ${Vote.tableName} (comment, rating, product_id, user_id, status, images, created_at)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `;
        const values = [
            voteData.comment || null,
            voteData.rating || 0,
            voteData.product_id,
            voteData.user_id,
            voteData.status || 'pending',
            imagesJSON,
        ];
        const [result] = await db.query(query, values);

        const updateProductQuery = `
            UPDATE ec_products 
            SET total_vote_count = total_vote_count + 1, 
                total_rating_score = total_rating_score + ?
            WHERE id = ?
        `;
        await db.query(updateProductQuery, [voteData.rating || 0, voteData.product_id]);


        return await Vote.findById(result.insertId);
    },

    // Cập nhật vote theo ID
    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${Vote.tableName}
            SET comment = ?, rating = ?, product_id = ?, user_id = ?, status = ?
            WHERE id = ?
        `;
        const values = [
            updateData.comment || null,
            updateData.rating || 0,
            updateData.product_id,
            updateData.user_id,
            updateData.status || 'pending',
            id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await Vote.findById(id) : null;
    },

    // Xóa vote theo ID
    deleteById: async (id) => {
        const selectVoteQuery = `SELECT product_id, rating FROM ${Vote.tableName} WHERE id = ? LIMIT 1`;
        const [voteResult] = await db.query(selectVoteQuery, [id]);

        if (!voteResult.length) {
            return false; // Nếu không tìm thấy đánh giá, trả về false
        }

        const { product_id, rating } = voteResult[0];

        // Xóa đánh giá
        const deleteVoteQuery = `DELETE FROM ${Vote.tableName} WHERE id = ?`;
        const [deleteResult] = await db.query(deleteVoteQuery, [id]);

        if (deleteResult.affectedRows > 0) {
            // Giảm số lần đánh giá và tổng điểm đánh giá của sản phẩm
            const updateProductQuery = `
            UPDATE ec_products 
            SET total_vote_count = total_vote_count - 1, 
                total_rating_score = total_rating_score - ?
            WHERE id = ?
        `;
            await db.query(updateProductQuery, [rating, product_id]);

            return true; // Xóa thành công và cập nhật sản phẩm
        }

        return false; // Xóa thất bại
    }
};

module.exports = Vote;
