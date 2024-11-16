// controllers/ratingController.js
const Rating = require('../../models/Rating');
const Service = require('../../models/Service');
const Product = require('../../models/Product');
const formatResponse = require("../../utils/response");

exports.rateItem = async (req, res) => {
    try {
        const { type, itemId, rating, comment } = req.body;
        const userId = req.user.id;

        // Kiểm tra loại đánh giá
        if (!['service', 'product'].includes(type)) {
            return res.status(400).json({ message: 'Invalid rating type.' });
        }

        // Kiểm tra sự tồn tại của dịch vụ hoặc sản phẩm
        let item;
        if (type === 'service') {
            item = await Service.findById(itemId);
        } else {
            item = await Product.findById(itemId);
        }

        if (!item) {
            return res.status(404).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found.` });
        }

        // Kiểm tra xem người dùng đã đánh giá item này chưa
        const existingRating = await Rating.findOne({ user: userId, type, itemId });
        if (existingRating) {
            return res.status(400).json({ message: 'You have already rated this item.' });
        }

        // Tạo đánh giá mới
        const newRating = new Rating({
            user: userId,
            type,
            itemId,
            rating,
            comment
        });

        await newRating.save();

        // Cập nhật trung bình đánh giá và tổng số đánh giá của item
        const ratings = await Rating.find({ type, itemId });
        const totalReviews = ratings?.length;
        const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews;

        item.totalReviews = totalReviews;
        item.averageRating = averageRating;
        await item.save();

        res.json({
            message: 'Rating submitted successfully.',
            rating: newRating,
            updatedAverageRating: averageRating,
            updatedTotalReviews: totalReviews
        });
    } catch (error) {
        console.error("Error submitting rating:", error);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.checkUserRating = async (req, res) => {
    try {
        const { type, itemId } = req.query;
        const userId = req.user.id;

        if (!['service', 'product'].includes(type)) {
            return res.status(400).json({ message: 'Invalid rating type.' });
        }

        const existingRating = await Rating.findOne({ user: userId, type, itemId });

        if (existingRating) {
            return res.json({ exists: true, rating: existingRating.rating });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking rating:", error);
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.getItemRating = async (req, res) => {
    try {
        const { type, itemId } = req.query;

        console.info("Type: ", type);
        console.info("Item ID: ", itemId);

        if (!['service', 'product'].includes(type)) {
            return res.status(400).json({ message: 'Invalid rating type.' });
        }

        const ratings = await Rating.find({ type, itemId });
        console.info("Ratings found: ", ratings);

        const totalReviews = ratings?.length;
        const averageRating = totalReviews > 0 ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews : 0;

        const userRatingDb = await Rating.findOne({ user: req.user.id, type, itemId });
        const userRating = userRatingDb ? { rating: userRatingDb.rating } : null;

        res.json(formatResponse('success', { userRating, averageRating, totalReviews }, 'Get list of orders successfully'));
    } catch (error) {
        console.error("Error fetching rating data:", error);
        res.status(500).json({ message: 'Server error.' });
    }
};
