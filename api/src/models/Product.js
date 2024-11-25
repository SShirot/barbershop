const db = require('../config/dbMysql');
const ProductsLabels = require('./ProductsLabels');

const Product = {
    tableName: 'ec_products',  // Tên bảng

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        name: 'varchar(255)',
        slug: 'varchar(255)',
        description: 'varchar(255)',
        avatar: 'varchar(255)',
        status: "enum('published', 'draft', 'pending') DEFAULT 'pending'",
        number: 'int(11) DEFAULT 0',
        price: 'int(11) DEFAULT 0',
        sale: 'int(11) DEFAULT 0',
        contents: 'text',
        images: 'json',
        length: 'double(8,2)',
        width: 'double(8,2)',
        height: 'double(8,2)',
        category_id: 'bigint(20) UNSIGNED',
        brand_id: 'bigint(20) UNSIGNED',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    getAll: async (page = 1, pageSize = 10, name = null,
                   category_id = null, sort = 'newest', rating = null, label_id = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT p.* FROM ${Product.tableName} p`;
        let countQuery = `SELECT COUNT(*) as total FROM ${Product.tableName} p`;
        const queryParams = [];

        // Điều kiện để join bảng nhãn khi lọc theo label_id
        if (label_id && label_id !== 'null' && label_id !== null) {
            console.info("===========[1] ===========[label_id] : ",label_id);
            query += ` INNER JOIN ec_products_labels pl ON p.id = pl.product_id`;
            countQuery += ` INNER JOIN ec_products_labels pl ON p.id = pl.product_id`;
        }

        // Điều kiện tìm kiếm theo tên
        if (name) {
            query += ' WHERE p.name LIKE ?';
            countQuery += ' WHERE p.name LIKE ?';
            queryParams.push(`%${name}%`);
        }

        // Điều kiện lọc theo category_id
        if (category_id) {
            query += name ? ' AND' : ' WHERE';
            query += ` p.category_id = ?`;
            countQuery += name ? ' AND' : ' WHERE';
            countQuery += ` p.category_id = ?`;
            queryParams.push(category_id);
        }

        // Điều kiện lọc theo rating
        // if (rating) {
        //     query += (name || category_id) ? ' AND' : ' WHERE';
        //     query += ` p.rating = ?`;
        //     countQuery += (name || category_id) ? ' AND' : ' WHERE';
        //     countQuery += ` p.rating = ?`;
        //     queryParams.push(rating);
        // }

        // Điều kiện lọc theo label_id
        if (label_id && label_id !== 'null' && label_id !== null) {
            console.info("===========[2] ===========[label_id] : ",label_id);
            query += (name || category_id || rating) ? ' AND' : ' WHERE';
            query += ` pl.product_label_id = ?`;
            countQuery += (name || category_id || rating) ? ' AND' : ' WHERE';
            countQuery += ` pl.product_label_id = ?`;
            queryParams.push(label_id);
        }

        // Điều kiện sắp xếp
        switch (sort) {
            case 'newest':
                query += ' ORDER BY p.created_at DESC';
                break;
            case 'oldest':
                query += ' ORDER BY p.created_at ASC';
                break;
            case 'price-asc':
                query += ' ORDER BY p.price ASC';
                break;
            case 'price-desc':
                query += ' ORDER BY p.price DESC';
                break;
            default:
                query += ' ORDER BY p.created_at DESC';
                break;
        }

        // Giới hạn và offset cho phân trang
        query += ' LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);
        console.info("===========[] ===========[query] : ",query);
        const [products] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, queryParams.slice(0, -2));
        const total = countResult[0].total;

        // Lấy thông tin category và tags cho từng sản phẩm
        for (let product of products) {
            // Lấy thông tin chi tiết category
            const categoryQuery = `SELECT id, name FROM categories WHERE id = ?`;
            const [categoryResult] = await db.query(categoryQuery, [product.category_id]);
            product.category = categoryResult[0] || null;

            // Lấy các labels của sản phẩm
            const labelsQuery = `
        SELECT l.id, l.name, l.slug, l.description, l.status, l.created_at, l.updated_at
        FROM ec_product_labels l
        INNER JOIN ec_products_labels pl ON l.id = pl.product_label_id
        WHERE pl.product_id = ?`;
            const [labels] = await db.query(labelsQuery, [product.id]);
            product.labels = labels;
        }

        return {
            data: products,
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


    // Phương thức lấy sản phẩm theo ID cùng với tags
    findById: async (id) => {
        const query = `SELECT * FROM ${Product.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        const product = rows.length > 0 ? rows[0] : null;

        if (product) {
            // Lấy các tag_id liên quan từ bảng trung gian
            // const tagsQuery = `SELECT tag_id FROM ec_products_tags WHERE product_id = ?`;
            // const [tags] = await db.query(tagsQuery, [id]);
            // product.tags = tags.map(tag => tag.tag_id);

            const categoryQuery = `SELECT id, name FROM categories WHERE id = ?`;
            const [categoryResult] = await db.query(categoryQuery, [product.category_id]);
            product.category = categoryResult[0] || null;

            const labelsQuery = `
            SELECT l.id, l.name, l.slug, l.description, l.status, l.created_at, l.updated_at
            FROM ec_product_labels l
            INNER JOIN ec_products_labels pl ON l.id = pl.product_label_id
            WHERE pl.product_id = ?`;
            const [labels] = await db.query(labelsQuery, [product.id]);
            product.labels = labels;
        }

        return product;
    },

    // Phương thức tạo mới sản phẩm cùng với tags
    create: async (productData, LabelsIds = []) => {
        const query = `INSERT INTO ${Product.tableName} (name, slug, description, avatar, images, status, number, price, sale, contents, length, width, height, category_id, brand_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            productData.name,
            productData.slug,
            productData.description || null,
            productData.avatar || null,
            JSON.stringify(productData.images || []),
            productData.status || 'pending',
            productData.number || 0,
            productData.price || 0,
            productData.sale || 0,
            productData.contents || null,
            productData.length || null,
            productData.width || null,
            productData.height || null,
            productData.categoryId,
            productData.brand_id
        ];
        const [result] = await db.query(query, values);

        // Lưu các tags cho sản phẩm vào bảng trung gian
        await ProductsLabels.assignLabel(result.insertId, LabelsIds);

        return await Product.findById(result.insertId);
    },

    // Phương thức cập nhật sản phẩm và tags theo ID
    updateById: async (id, updateData, LabelsIds = []) => {
        const query = `
            UPDATE ${Product.tableName} 
            SET name = ?, slug = ?, description = ?, avatar = ?,images = ?, status = ?, number = ?, price = ?, sale = ?, contents = ?, length = ?, width = ?, height = ?, category_id = ?, brand_id = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.description || null,
            updateData.avatar || null,
            JSON.stringify(updateData.images || []),
            updateData.status || 'pending',
            updateData.number || 0,
            updateData.price || 0,
            updateData.sale || 0,
            updateData.contents || null,
            updateData.length || null,
            updateData.width || null,
            updateData.height || null,
            updateData.categoryId,
            updateData.brand_id,
            id
        ];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            await ProductsLabels.assignLabel(id, LabelsIds);
            return await Product.findById(id);
        }

        return null;
    },

    // Phương thức xóa sản phẩm theo ID
    deleteById: async (id) => {

        // const deleteTagsQuery = `DELETE FROM ec_products_tags WHERE product_id = ?`;
        // await db.query(deleteTagsQuery, [id]);

        const query = `DELETE FROM ${Product.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    },
    showDashboardVoteDetail: async (id) => {
        const [rows] = await db.query(
            `
            SELECT 
                ROUND(AVG(rating), 1) AS average_rating,
                COUNT(*) AS total_reviews,
                SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS five_star,
                SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) AS four_star,
                SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) AS three_star,
                SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) AS two_star,
                SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) AS one_star
            FROM votes
            WHERE product_id = ? ;`,
            [id]
        );

        if (!rows || rows.length === 0) {
            return null;
        }
        return rows[0];
    }
};

module.exports = Product;
