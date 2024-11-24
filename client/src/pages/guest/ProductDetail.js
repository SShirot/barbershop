import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {Container, Row, Col, Button, Badge, Form, ProgressBar, Nav} from 'react-bootstrap';
import { FaStar, FaRegStar, FaTruck, FaShieldAlt, FaExchangeAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import apiProductService from '../../api/apiProductService';
import {createSlug, formatPrice} from '../../helpers/formatters';
import './style/ProductDetail.css';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const dispatch = useDispatch();



    useEffect(() => {
        const fetchProduct = async () => {
            if (slug) {
                const id = slug.split('-').pop();
                try {
                    const response = await apiProductService.showProductDetail(id);
                    setProduct(response.data.data);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
        };
        const getProducts = async () => {
            const productsResponse = await apiProductService.getLists({
                page: 1,
                page_size: 10,
            });
            setRelatedProducts(productsResponse.data.data);
        };
        fetchProduct().then(r => {});
        getProducts().then(r => {})
    }, [slug]);
    console.info("===========[] ===========[] : ",slug);
    if (!product) {
        return <div className="text-center my-5">Đang tải...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index}>
        {index < rating ? (
            <FaStar className="text-warning" />
        ) : (
            <FaRegStar className="text-warning" />
        )}
      </span>
        ));
    };

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

    return (
        <Container className="product-detail-container my-4">
            {/* Existing product detail sections */}
            <Row>
                <Col md={4}>
                    <div className="product-images">
                        <img
                            src={product.images?.[selectedImage] || product.avatar}
                            alt={product.name}
                            className="main-image mb-3"
                        />
                        <div className="image-thumbnails">
                            {product.images?.map((image, idx) => (
                                <img
                                    key={idx}
                                    src={image}
                                    alt={`${product.name} - ${idx + 1}`}
                                    className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(idx)}
                                />
                            ))}
                        </div>
                    </div>
                </Col>
                <Col md={5}>
                    <div className="product-info">
                        <div className="d-flex align-items-center mb-2">
                            <Badge bg="primary" className="me-2">Tiki Trading</Badge>
                            <Badge bg="success">Chính hãng</Badge>
                        </div>
                        <h1 className="product-title">{product.name}</h1>
                        <div className="d-flex align-items-center mb-2">
                            <div className="rating me-2">
                                {renderStars(5)}
                                <span className="rating-count ms-1">(2)</span>
                            </div>
                            <div className="sold-count">| Đã bán 47</div>
                        </div>
                        <div className="product-price mb-3">
                            {product.sale ? (
                                <>
                                    <span className="current-price">{formatPrice(product.price)}</span>
                                    <span className="original-price ms-2">{formatPrice(product.price)}</span>
                                    <span className="discount-percent ms-2">-{product.sale}%</span>
                                </>
                            ) : (
                                <>
                                    <span className="current-price">{formatPrice(product.price)}</span>
                                </>
                            )}
                        </div>
                        <div className="delivery-info mb-3">
                            <h6>Thông tin vận chuyển</h6>
                            <div className="d-flex align-items-center">
                            <FaTruck className="me-2 text-primary" />
                                <div>
                                    <div><Badge bg="danger">Giao siêu tốc 2h</Badge></div>
                                    <div>Trước 10h ngày mai: <span className="text-success">Miễn phí</span> 25.000đ</div>
                                </div>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: product.content}} />
                    </div>
                </Col>
                <Col md={3}>
                    <div className="product-actions">
                        <div className="quantity-selector mb-3">
                            <Form.Label>Số lượng</Form.Label>
                            <div className="d-flex">
                                <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                                <Form.Control
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="mx-2 text-center"
                                />
                                <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</Button>
                            </div>
                        </div>
                        <Button variant="danger" className="w-100 mb-2" onClick={handleAddToCart}>
                            Chọn mua
                        </Button>
                        <Button variant="outline-primary" className="w-100 mb-3">
                            Mua trước trả sau
                        </Button>
                        <div className="product-policies">
                            <div className="d-flex align-items-center mb-2">
                                <FaTruck className="me-2 text-primary" />
                                <span>Giao hàng miễn phí</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <FaShieldAlt className="me-2 text-primary" />
                                <span>Đổi trả miễn phí trong 30 ngày</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <FaExchangeAlt className="me-2 text-primary" />
                                <span>Hàng chính hãng 100%</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Customer Reviews Section */}
            <Row className="mt-5">
                <Col lg={8} className="mx-auto">
                    <div className="customer-reviews bg-white p-4 rounded">
                        <h2 className="mb-4">Khách hàng đánh giá</h2>
                        <div className="d-flex mb-4">
                            <div className="rating-summary text-center me-5">
                                <div className="rating-average display-4">5.0</div>
                                <div className="rating-stars mb-2">
                                    {renderStars(5)}
                                </div>
                                <div className="rating-count text-muted">(2 đánh giá)</div>
                            </div>
                            <div className="rating-bars flex-grow-1">
                                {[5, 4, 3, 2, 1].map((stars) => (
                                    <div key={stars} className="d-flex align-items-center mb-2">
                                        <div className="me-2" style={{ width: '60px' }}>
                                            {stars} sao
                                        </div>
                                        <ProgressBar
                                            now={stars === 5 ? 100 : 0}
                                            className="flex-grow-1 me-2"
                                            style={{ height: '8px' }}
                                        />
                                        <div style={{ width: '30px' }}>{stars === 5 ? 2 : 0}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {renderRatingFilters()}
                    </div>
                </Col>
            </Row>

            {/* Related Products Section */}
            <Row className="mt-5">
                <Col>
                    <div className="related-products bg-white p-4 rounded">
                        <h6 className="mb-4 text-start my-4 text-uppercase">Sản phẩm liên quan</h6>
                        <Row>
                            {relatedProducts.map((relatedProduct, idx) => (
                                <Col key={idx} xs={12} sm={6} md={4} lg={2} className="mb-3">
                                    <div className="product-card h-100">
                                        <Nav.Link as={Link} to={`/p/${createSlug(relatedProduct.name)}-${relatedProduct.id}`}>
                                        <img
                                            src={relatedProduct.avatar}
                                            alt={relatedProduct.name}
                                            className="img-fluid mb-2"
                                        />
                                        </Nav.Link>
                                        <h3 className="product-title-small">
                                            <Nav.Link as={Link} to={`/p/${createSlug(relatedProduct.name)}-${relatedProduct.id}`}>
                                                {relatedProduct.name}
                                            </Nav.Link>
                                        </h3>
                                        <div className="rating-small mb-2">
                                            {renderStars(5)}
                                        </div>
                                        <div className="price-small">
                                            {formatPrice(relatedProduct.price)}
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
