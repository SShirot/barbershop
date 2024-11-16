const db = require('../config/dbMysql');
const ArticleTag = require('./PostTag'); // Model trung gian lưu quan hệ giữa article và tag

const Article = {
    tableName: 'bl_articles',

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        name: 'varchar(255)',
        slug: 'varchar(255)',
        description: 'varchar(255)',
        content: 'text',
        status: "enum('published', 'draft', 'pending') DEFAULT 'pending'",
        author_id: 'int(11)',
        menu_id: 'bigint(20) UNSIGNED',
        is_featured: 'tinyint(4) DEFAULT 0',
        avatar: 'varchar(255)',
        views: 'bigint(20) DEFAULT 0',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    // Phương thức lấy tất cả bài viết với phân trang và tìm kiếm
    getAll: async (page = 1, pageSize = 10, name = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM ${Article.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${Article.tableName}`;
        const queryParams = [];

        if (name) {
            query += ' WHERE name LIKE ?';
            countQuery += ' WHERE name LIKE ?';
            queryParams.push(`%${name}%`);
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const [articles] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, name ? [`%${name}%`] : []);
        const total = countResult[0].total;

        // Lấy thông tin menu và tags cho từng bài viết
        for (let article of articles) {
            // Lấy thông tin chi tiết menu
            const menuQuery = `SELECT id, name, slug, description, status, created_at, updated_at FROM bl_menus WHERE id = ?`;
            const [menuResult] = await db.query(menuQuery, [article.menu_id]);
            article.menu = menuResult[0] || null;

            // Lấy tags liên kết với bài viết
            const tagsQuery = `
                SELECT t.id, t.name, t.slug, t.description, t.status, t.created_at, t.updated_at
                FROM bl_tags t
                INNER JOIN bl_articles_tags at ON t.id = at.tag_id
                WHERE at.article_id = ?`;
            const [tags] = await db.query(tagsQuery, [article.id]);
            article.tags = tags; // Thêm mảng tags cho mỗi bài viết
        }

        return {
            data: articles,
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

    // Phương thức lấy bài viết theo ID cùng với tags
    findById: async (id) => {
        const query = `SELECT * FROM ${Article.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        const article = rows?.length > 0 ? rows[0] : null;

        if (article) {
            // Lấy các tag_id liên quan từ bảng trung gian
            const tagsQuery = `SELECT tag_id FROM bl_articles_tags WHERE article_id = ?`;
            const [tags] = await db.query(tagsQuery, [id]);
            article.tags = tags.map(tag => tag.tag_id);

            const menuQuery = `SELECT id, name, slug, description, status, created_at, updated_at FROM bl_menus WHERE id = ?`;
            const [menuResult] = await db.query(menuQuery, [article.menu_id]);
            article.menu = menuResult[0] || null;
        }

        return article;
    },

    // Phương thức tạo mới article cùng với tags
    create: async (articleData, tagIds = []) => {
        const query = `INSERT INTO ${Article.tableName} (name, slug, description, content, status, author_id, menu_id, is_featured, avatar, views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            articleData.name,
            articleData.slug,
            articleData.description || null,
            articleData.content,
            articleData.status || 'pending',
            articleData.author_id,
            articleData.menuId,
            articleData.is_featured || 0,
            articleData.avatar || null,
            articleData.views || 0
        ];
        const [result] = await db.query(query, values);

        // Lưu các tags cho bài viết vào bảng trung gian
        await ArticleTag.assignTags(result.insertId, tagIds);

        return await Article.findById(result.insertId);
    },

    // Phương thức cập nhật article và tags theo ID
    updateById: async (id, updateData, tagIds = []) => {
        const query = `
            UPDATE ${Article.tableName} 
            SET name = ?, slug = ?, description = ?, content = ?, status = ?, author_id = ?, menu_id = ?, is_featured = ?, avatar = ?, views = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.description || null,
            updateData.content,
            updateData.status || 'pending',
            updateData.author_id,
            updateData.menuId,
            updateData.is_featured || 0,
            updateData.avatar || null,
            updateData.views || 0,
            id
        ];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            // Cập nhật các tags cho bài viết trong bảng trung gian
            await ArticleTag.assignTags(id, tagIds);
            return await Article.findById(id);
        }

        return null;
    },

    // Phương thức xóa  theo ID
    deleteById: async (id) => {

        const deleteTagsQuery = `DELETE FROM bl_articles_tags WHERE article_id = ?`;
        await db.query(deleteTagsQuery, [id]);

        const query = `DELETE FROM ${Article.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Article;
