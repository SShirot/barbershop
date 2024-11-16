const db = require('../config/dbMysql');
const PostTag = {
    tableName: 'bl_articles_tags',  // Tên bảng

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        article_id: 'bigint(20) UNSIGNED NOT NULL',
        tag_id: 'bigint(20) UNSIGNED NOT NULL'
    },
    assignTags: async (articleId, tagIds) => {
        // Xóa các tags hiện có của bài viết
        await db.query(`DELETE FROM ${PostTag.tableName} WHERE article_id = ?`, [articleId]);

        // Thêm các tags mới vào bảng trung gian
        const values = tagIds.map(tagId => [articleId, tagId]);
        if (values?.length > 0) {
            const query = `INSERT INTO ${PostTag.tableName} (article_id, tag_id) VALUES ?`;
            await db.query(query, [values]);
        }
    }
};

module.exports = PostTag;
