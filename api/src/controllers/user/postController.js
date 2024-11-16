const Post = require('../../models/Post');
const Menu = require('../../models/Menu');
const formatResponse = require("../../utils/response");

// Lấy danh sách bài viết
exports.getAllPosts = async (req, res) => {
    try {
        const params = req.query;
        const query = {};
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.page_size) || 10;

        if (params.title) {
            query.title = { $regex: params.title, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
        }
        const total = await Post.countDocuments(query);
        const posts = await Post.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate('menu', 'name') // Lấy tên menu liên quan
            .populate('createdBy', 'name'); // Lấy tên người tạo

        const meta = {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        };
        res.json(formatResponse('success', { posts, meta }, 'Get list of posts successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

exports.getAllMenus = async (req, res) => {
    try {
        const params = req.query;
        const query = {};
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.page_size) || 1000;

        const total = await Menu.countDocuments(query);
        const menus = await Menu.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const meta = {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        };
        res.json(formatResponse('success', { menus, meta }, 'Get list of menus successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};

// Lấy chi tiết bài viết theo ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('menu', 'name')
            .populate('createdBy', 'name');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(formatResponse('success', { post }, 'Get post successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tạo bài viết mới
exports.createPost = async (req, res) => {
    const { title, description, content, avatar, menu } = req.body;

    const newPost = new Post({
        title,
        description,
        content,
        avatar,
        menu,
        createdBy: req.user.id // Lấy từ thông tin user đăng nhập
    });

    try {
        const post = await newPost.save();
        res.status(200).json(formatResponse('success', { post }, 'Post created successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Cập nhật bài viết
exports.updatePost = async (req, res) => {
    try {
        const postUpdate = await Post.findById(req.params.id);
        if (!postUpdate) return res.status(404).json({ message: 'Post not found' });

        const { title, description, content, avatar, menu } = req.body;
        if (title) postUpdate.title = title;
        if (description) postUpdate.description = description;
        if (content) postUpdate.content = content;
        if (avatar) postUpdate.avatar = avatar;
        if (menu) postUpdate.menu = menu;

        const post = await postUpdate.save();
        res.status(200).json(formatResponse('success', { post }, 'Post updated successfully'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await Post.findByIdAndDelete(req.params.id);
        res.json(formatResponse('success', [], 'Post deleted successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
