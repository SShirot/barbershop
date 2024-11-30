const db = require('../config/dbMysql');
const ProductsLabels = require('./ProductsLabels');

const Product = {
    tableName: 'ec_products', // Tên bảng sản phẩm
    variantTable: 'ec_product_variants', // Tên bảng biến thể sản phẩm

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
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },

    // Lấy danh sách sản phẩm
    getAll: async (page = 1, pageSize = 10, name = null, category_id = null, sort = 'newest', label_id = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT p.* FROM ${Product.tableName} p`;
        let countQuery = `SELECT COUNT(*) as total FROM ${Product.tableName} p`;
        const queryParams = [];

        // Điều kiện join bảng nhãn
        if (label_id > 0) {
            console.info("===========[] ===========[label_id] : ",label_id);
            query += ` INNER JOIN ec_products_labels pl ON p.id = pl.product_id`;
            countQuery += ` INNER JOIN ec_products_labels pl ON p.id = pl.product_id`;
        }

        // Điều kiện tìm kiếm theo tên
        if (name != null) {
            console.info("===========[] ===========[name] : ",name);
            query += ' WHERE p.name LIKE ?';
            countQuery += ' WHERE p.name LIKE ?';
            queryParams.push(`%${name}%`);
        }

        // Điều kiện lọc theo category_id
        if (category_id > 0) {
            console.info("===========[] ===========[category_id] : ",category_id);
            query += name ? ' AND' : ' WHERE';
            query += ` p.category_id = ?`;
            countQuery += name ? ' AND' : ' WHERE';
            countQuery += ` p.category_id = ?`;
            queryParams.push(category_id);
        }

        // Điều kiện lọc theo label_id
        if (label_id > 0) {
            console.info("===========[] ===========[label_id] : ",label_id);
            query += (name || category_id) ? ' AND' : ' WHERE';
            query += ` pl.product_label_id = ?`;
            countQuery += (name || category_id) ? ' AND' : ' WHERE';
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

        // Giới hạn phân trang
        query += ' LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const [products] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, queryParams.slice(0, -2));
        const total = countResult[0].total;

        // Gắn thêm thông tin category, labels, và biến thể
        for (let product of products) {
            product.category = await Product.getCategory(product.category_id);
            product.labels = await Product.getLabels(product.id);
            product.variants = await Product.getVariants(product.id); // Bao gồm thông tin attributes
            product.brand = await Product.getBrand(product.brand_id);
        }

        return {
            data: products,
            meta: {
                total,
                perPage: pageSize,
                currentPage: page,
                lastPage: Math.ceil(total / pageSize),
            },
        };
    },

    // Lấy sản phẩm theo ID
    findById: async (id) => {
        const query = `SELECT * FROM ${Product.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        const product = rows.length > 0 ? rows[0] : null;

        if (product) {
            product.category = await Product.getCategory(product.category_id);
            product.labels = await Product.getLabels(product.id);
            product.variants = await Product.getVariants(product.id);
        }

        return product;
    },

    // Tạo sản phẩm mới
    create: async (productData, LabelsIds = [], variants = []) => {
        const query = `
            INSERT INTO ${Product.tableName} (name, slug, description, avatar, status, number, price, sale, contents, length, width, height, category_id, brand_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            productData.name,
            productData.slug,
            productData.description || null,
            productData.avatar || null,
            // JSON.stringify(productData.images || []),
            productData.status || 'pending',
            productData.number || 0,
            productData.price || 0,
            productData.sale || 0,
            productData.contents || null,
            productData.length || null,
            productData.width || null,
            productData.height || null,
            productData.categoryId,
            productData.brandId,
        ];
        const [result] = await db.query(query, values);
        const productId = result.insertId;

        // Lưu labels
        await ProductsLabels.assignLabel(productId, LabelsIds);

        // Lưu biến thể
        for (const variant of variants) {
            await Product.createVariant(productId, variant);
        }

        return await Product.findById(productId);
    },

    // Cập nhật sản phẩm
    updateById: async (id, updateData, LabelsIds = [], variants = []) => {
        const query = `
            UPDATE ${Product.tableName} 
            SET name = ?, slug = ?, description = ?, avatar = ?, status = ?, number = ?, price = ?, sale = ?, contents = ?, length = ?, width = ?, height = ?, category_id = ?, brand_id = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.description || null,
            updateData.avatar || null,
            updateData.status || 'pending',
            updateData.number || 0,
            updateData.price || 0,
            updateData.sale || 0,
            updateData.contents || null,
            updateData.length || null,
            updateData.width || null,
            updateData.height || null,
            updateData.categoryId,
            updateData.brandId,
            id,
        ];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            // Cập nhật labels
            await ProductsLabels.assignLabel(id, LabelsIds);

            // Cập nhật biến thể
            await Product.updateVariants(id, variants);

            return await Product.findById(id);
        }

        return null;
    },

    // Xóa sản phẩm
    deleteById: async (id) => {
        await Product.deleteVariants(id);
        const query = `DELETE FROM ${Product.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    },

    // Xử lý biến thể
    getVariants: async (productId) => {
        const query = `
        SELECT 
            v.*, 
            GROUP_CONCAT(
                CONCAT(va.attribute_value_id, ':', av.title, ':', av.is_default)
            ) AS attributes
        FROM ec_product_variants v
        LEFT JOIN ec_variant_attributes va ON v.id = va.variant_id
        LEFT JOIN ec_attribute_values av ON va.attribute_value_id = av.id
        WHERE v.product_id = ?
        GROUP BY v.id
    `;
        const [variants] = await db.query(query, [productId]);

        // Xử lý dữ liệu attributes để đưa về dạng cấu trúc mong muốn
        return variants.map(variant => {
            const attributes = variant.attributes
                ? variant.attributes.split(',').map(attr => {
                    const [id, label, isDefault] = attr.split(':');
                    return {
                        attribute_value_id: id,
                        attribute_label: label,
                        is_default: Boolean(Number(isDefault))
                    };
                })
                : [];
            return { ...variant, attributes };
        });
    },

    createVariant: async (productId, variant) => {
        console.info("===========[] ===========[insert variant] : ",variant);
        const query = `
            INSERT INTO ${Product.variantTable} (product_id, sku, price, stock) 
            VALUES (?, ?, ?, ?)`;
        const values = [
            productId,
            variant.sku,
            variant.price || 0,
            variant.stock || 0
        ];
        const [result] = await db.query(query, values);
        console.info("===========[createVariant] ===========[result] : ",result);
        const variantId = result.insertId;
        console.info("===========[createVariant] ===========[variantId] : ",variantId);
        if (variant.attributes && variant.attributes.length > 0) {
            await Product.createVariantAttributes(variantId, variant.attributes);
        }
        return variantId;
    },

    updateVariants: async (productId, variants) => {
        await Product.deleteVariants(productId);
        for (const variant of variants) {
            // await Product.createVariant(productId, variant);
            const variantId = await Product.createVariant(productId, variant);
            console.info("===========[updateVariants] ===========[variantId] : ",variantId);
            // Nếu variant có attributes, lưu vào bảng ec_variant_attributes
            if (variant.attributes && variant.attributes.length > 0) {
                await Product.createVariantAttributes(variantId, variant.attributes);
            }
        }
    },

    createVariantAttributes: async (variantId, attributes) => {
        console.info("===========[createVariantAttributes] ===========[variantId] : ",variantId);
        console.info("===========[createVariantAttributes] ===========[attributes] : ",attributes);
        const query = `
        INSERT INTO ec_variant_attributes (variant_id, attribute_value_id) 
        VALUES (?, ?)`;
        for (const attributeId of attributes) {
            console.info("===========[item] ===========[attributeId] : ",attributeId);
            await db.query(query, [variantId, attributeId.value.value]);
        }
    },

    deleteVariants: async (productId) => {
        const query = `DELETE FROM ${Product.variantTable} WHERE product_id = ?`;
        await db.query(query, [productId]);
    },

    // Lấy thông tin category
    getCategory: async (categoryId) => {
        const query = `SELECT id, name FROM categories WHERE id = ?`;
        const [category] = await db.query(query, [categoryId]);
        return category.length > 0 ? category[0] : null;
    },

    getBrand: async (brandId) => {
        const query = `SELECT id, name FROM ec_brands WHERE id = ?`;
        const [brand] = await db.query(query, [brandId]);
        return brand.length > 0 ? brand[0] : null;
    },

    // Lấy thông tin labels
    getLabels: async (productId) => {
        const query = `
            SELECT l.* FROM ec_product_labels l
            INNER JOIN ec_products_labels pl ON l.id = pl.product_label_id
            WHERE pl.product_id = ?`;
        const [labels] = await db.query(query, [productId]);
        return labels;
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

        return rows;
    }
};

module.exports = Product;
