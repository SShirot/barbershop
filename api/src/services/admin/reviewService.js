const Review = require('../../models/Review');

exports.deleteReview = async (reviewId) => {
    await Review.findByIdAndDelete(reviewId);
};

exports.getReviewsByService = async (serviceId) => {
    const reviews = await Review.find({ service: serviceId }).populate('user', 'name email');
    const totalReviews = reviews?.length;
    const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
    return { reviews, totalReviews, averageRating };
};

exports.getAllReviews = async (page, pageSize) => {
    const total = await Review.countDocuments();
    const reviews = await Review.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('user', 'name email')
        .populate('service', 'name');

    return {
        reviews,
        meta: {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        }
    };
};
