import React, { useState, useEffect } from 'react';
import { Button, Col, ProgressBar, Row } from 'react-bootstrap';
import SlideSkeleton from './../loading/SlideSkeleton';
import { renderStars } from "../../../helpers/formatters";
import apiProductService from "../../../api/apiProductService";

const DashboardVoteProduct = ({ product }) => {
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm state loading

    useEffect(() => {
        if (!product) return; // Kiểm tra nếu chưa có sản phẩm
        setLoading(true);
        const fetchDashboard = async () => {
            try {
                const response = await apiProductService.showDashboardVoteDetail(product.id);
                console.info("===========[] ===========[response] : ", response.data.data);
                setReviewData(response.data.data);
            } catch (error) {
                console.error("Error fetching dashboard votes:", error);
            } finally {
                setLoading(false); // Đặt loading thành false sau khi tải xong
            }
        };

        fetchDashboard();
    }, [product]);

    const renderRatingFilters = () => {
        const filters = ['Mới nhất', 'Có hình ảnh', 'Đã mua hàng', '5 sao', '4 sao', '3 sao', '2 sao', '1 sao'];
        return (
            <div className="rating-filters">
                {filters.map((filter, index) => (
                    <Button key={index} variant="outline-secondary" size="sm" className="me-2 mb-2">
                        {filter}
                    </Button>
                ))}
            </div>
        );
    };

    if (loading) {
        // Hiển thị SlideSkeleton khi đang tải dữ liệu
        return (
            <Row className="mt-5">
                <Col lg={8} className="mx-auto">
                    <div className="customer-reviews bg-white p-4 rounded">
                        <h2 className="mb-4 skeleton skeleton-text" style={{ width: '200px', height: '24px' }}> </h2>
                        <div className="d-flex mb-4">
                            {/* Rating Summary */}
                            <div className="rating-summary text-center me-5">
                                <div className="rating-average display-4 skeleton skeleton-circle" style={{ width: '80px', height: '80px' }}></div>
                                <div className="rating-stars mb-2 skeleton skeleton-text" style={{ width: '100px', height: '20px' }}></div>
                                <div className="rating-count text-muted skeleton skeleton-text" style={{ width: '150px', height: '18px' }}></div>
                            </div>
                            {/* Rating Bars */}
                            <div className="rating-bars flex-grow-1">
                                {[5, 4, 3, 2, 1].map((stars) => (
                                    <div key={stars} className="d-flex align-items-center mb-2">
                                        <div className="me-2 skeleton skeleton-text" style={{ width: '60px', height: '16px' }}></div>
                                        <ProgressBar
                                            now={0}
                                            className="flex-grow-1 me-2 skeleton"
                                            style={{ height: '8px' }}
                                        />
                                        <div className="skeleton skeleton-text" style={{ width: '30px', height: '16px' }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }

    return (
        <Row className="mt-5">
            <Col lg={8} className="mx-auto">
                <div className="customer-reviews bg-white p-4 rounded">
                    <h2 className="mb-4">Khách hàng đánh giá</h2>
                    <div className="d-flex mb-4">
                        <div className="rating-summary text-center me-5">
                            <div className="rating-average display-4">{reviewData.average_rating}</div>
                            <div className="rating-stars mb-2">{renderStars(Math.round(reviewData.average_rating))}</div>
                            <div className="rating-count text-muted">({reviewData.total_reviews} đánh giá)</div>
                        </div>
                        <div className="rating-bars flex-grow-1">
                            {[5, 4, 3, 2, 1].map((stars) => (
                                <div key={stars} className="d-flex align-items-center mb-2">
                                    <div className="me-2" style={{width: '60px'}}>
                                        {stars} sao
                                    </div>
                                    <ProgressBar
                                        now={(reviewData[`${["one_star", "two_star", "three_star", "four_star", "five_star"][stars - 1]}`] / reviewData.total_reviews) * 100}
                                        className="flex-grow-1 me-2"
                                        style={{ height: '8px' }}
                                    />
                                    {/*<div style={{width: '30px'}}>{reviewData[`${stars}_star`]}</div>*/}
                                    <div style={{width: '30px'}}>
                                        {reviewData[`${["one_star", "two_star", "three_star", "four_star", "five_star"][stars - 1]}`]}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    {renderRatingFilters()}
                </div>
            </Col>
        </Row>
    );
};

export default DashboardVoteProduct;
