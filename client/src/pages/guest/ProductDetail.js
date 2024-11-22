import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Carousel, Button, ProgressBar } from 'react-bootstrap';
import './style/ProductDetail.css';
import ProductCarousel from "../components/product/ProductCarousel";
import apiProductService from "./../../api/apiProductService";
import {formatPrice} from "../../helpers/formatters";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/slices/cartSlice";
import {FaShoppingCart} from "react-icons/fa";

const ProductDetail = () => {
    const { slug} = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const dispatch = useDispatch();

    console.info("===========[ProductDetail] ===========[] : ",);
    useEffect(() => {
        // Hàm để gọi API lấy chi tiết sản phẩm dựa trên productId
        const fetchProductDetails = async (id) => {
            try {
                const response = await apiProductService.showProductDetail(id);
                console.info("===========[] ===========[response] : ",response);
                setProduct(response.data.data);
                setRelatedProducts([]);
                // setRelatedProducts(response.data.relatedProducts);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        if (slug) {
            // Tách productId từ slug
            const id = slug.split('-').pop();
            fetchProductDetails(id);
        }
    }, [slug]);

    if (!product) {
        return <div>Loading...</div>; // Hoặc bạn có thể sử dụng hiệu ứng loading khác
    }

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ ...product, quantity: 1 }));  // Thêm 1 sản phẩm vào giỏ hàng
        }
    };

    return (
        <Container className="product-detail-container">
            <Row>
                <Col md={6}>
                    <Carousel>
                        {(product?.album && product.album?.length > 0) ? (
                            product.album.map((image, idx) => (
                                <Carousel.Item key={idx}>
                                    <img className="d-block w-100" src={image} alt={`Product image ${idx + 1}`} />
                                </Carousel.Item>
                            ))
                        ) : (
                            <Carousel.Item>
                                <img className="d-block w-100" src={product?.avatar} alt="Product avatar" />
                            </Carousel.Item>
                        )}
                    </Carousel>
                </Col>
                <Col md={6}>
                    <h1>{product.name}</h1>
                    <h2 className="text-danger">{formatPrice(product.price)}</h2>
                    <Button variant="danger" className="mb-3" onClick={handleAddToCart}>
                        Mua ngay <FaShoppingCart size={16} />
                    </Button>
                    <h4>Thông tin sản phẩm</h4>
                    <div dangerouslySetInnerHTML={{__html: product.content}}/>
                    {/*<h4>Thông số kỹ thuật</h4>*/}
                    {/*<ul className="specifications">*/}
                    {/*    {product.specifications.map((spec, idx) => (*/}
                    {/*        <li key={idx}><strong>{spec.key}:</strong> {spec.value}</li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </Col>
            </Row>

            <Row className="mt-5">
            <Col md={6}>
                    <h4>Đánh giá sản phẩm</h4>
                    <div className="review-summary">
                        <div className="average-rating">
                            {/*<span className="rating-number">{product.reviews.average}</span>/5*/}
                        </div>
                        <div className="rating-details">
                            {/*<ProgressBar now={(product.reviews.detailed[5] / product.reviews.total) * 100} label={`${product.reviews.detailed[5]} đánh giá`} className="mb-2" />*/}
                            {/*<ProgressBar now={(product.reviews.detailed[4] / product.reviews.total) * 100} label={`${product.reviews.detailed[4]} đánh giá`} className="mb-2" />*/}
                            {/*<ProgressBar now={(product.reviews.detailed[3] / product.reviews.total) * 100} label={`${product.reviews.detailed[3]} đánh giá`} className="mb-2" />*/}
                            {/*<ProgressBar now={(product.reviews.detailed[2] / product.reviews.total) * 100} label={`${product.reviews.detailed[2]} đánh giá`} className="mb-2" />*/}
                            {/*<ProgressBar now={(product.reviews.detailed[1] / product.reviews.total) * 100} label={`${product.reviews.detailed[1]} đánh giá`} />*/}
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="mt-5 related-products">
                <h4>Sản phẩm liên quan</h4>
                <ProductCarousel title={'Sản phẩm liên quan'} products={relatedProducts} />
            </Row>
        </Container>
    );
};

export default ProductDetail;
