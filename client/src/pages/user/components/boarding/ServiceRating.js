import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import boardingApi from "./../../../../api/boardingApi";

const ServiceRating = ({ type, itemId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [comment, setComment] = useState(""); // Thêm state cho nhận xét

    useEffect(() => {
        const fetchRatingData = async () => {
            try {
                const response = await boardingApi.getItemRating(type, itemId);
                const { userRating, averageRating, totalReviews } = response.data;

                if (userRating) {
                    setRating(userRating.rating);
                    setHasRated(true);
                }
                setAverageRating(averageRating || 0);
                setTotalReviews(totalReviews || 0);
            } catch (error) {
                console.error("Error fetching rating data:", error);
            }
        };
        fetchRatingData();
    }, [type, itemId]);

    const handleRate = async (value) => {
        if (hasRated) {
            alert('You have already rated this item.');
            return;
        }
        try {
            const response = await boardingApi.rateItem({ type, itemId, rating: value, comment });
            setRating(value);
            setHasRated(true);
            setAverageRating(response.data.updatedAverageRating || 0);
            setTotalReviews(response.data.updatedTotalReviews || 0);
            alert('Thank you for your rating!');
        } catch (error) {
            console.error("Error submitting rating:", error);
            alert('Failed to submit rating.');
        }
    };

    return (
        <div>
            <div>
                {[...Array(5)].map((star, index) => {
                    const value = index + 1;
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            color={(hover || rating) >= value ? '#ffc107' : '#e4e5e9'}
                            onClick={() => handleRate(value)}
                            onMouseEnter={() => setHover(value)}
                            onMouseLeave={() => setHover(0)}
                            style={{ cursor: hasRated ? 'default' : 'pointer', marginRight: 8 }}
                        />
                    );
                })}
            </div>
            {hasRated && <span>Your Rating: {rating} stars</span>}
            <div>
                <span>Average Rating: {averageRating.toFixed(1)} ({totalReviews} reviews)</span>
            </div>
            {!hasRated && (
                <div style={{ marginTop: '10px' }}>
                    <textarea
                        placeholder="Enter your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        style={{ width: '100%', padding: '10px' }}
                    />
                    <button
                        onClick={() => handleRate(rating)}
                        style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ffc107', border: 'none', cursor: 'pointer' }}
                    >
                        Submit Rating
                    </button>
                </div>
            )}
        </div>
    );
};

export default ServiceRating;
