const Review = require('../../models/Review');
const Service = require('../../models/Service');

exports.createReview = async (reviewData) => {
    const review = new Review(reviewData);
    await review.save();

    // Cập nhật tổng số đánh giá và trung bình số đánh giá
    const service = await Service.findById(reviewData.service);
    const reviews = await Review.find({ service: reviewData.service });

    const totalReviews = reviews?.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

    service.totalReviews = totalReviews;
    service.averageRating = averageRating;
    await service.save();

    return review;
};

exports.deleteReview = async (reviewId) => {
    const review = await Review.findByIdAndDelete(reviewId);

    if (review) {
        // Cập nhật tổng số đánh giá và trung bình số đánh giá
        const service = await Service.findById(review.service);
        const reviews = await Review.find({ service: review.service });

        const totalReviews = reviews?.length;
        const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;

        service.totalReviews = totalReviews;
        service.averageRating = averageRating;
        await service.save();
    }
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
