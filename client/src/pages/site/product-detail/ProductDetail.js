import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {Container, Row, Col, Button, Badge, Form, ProgressBar, Nav} from 'react-bootstrap';
import {FaStar, FaRegStar, FaTruck, FaShieldAlt, FaExchangeAlt, FaStarHalfAlt} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import apiProductService from '../../../api/apiProductService';
import {formatPrice, renderStarsItem} from '../../../helpers/formatters';
import '../style/ProductDetail.css';
import apiVoteService from "../../../api/apiVoteService";

const DashboardVoteProduct = React.lazy(() => import('../../components/vote/DashboardVoteProduct'));
const RelatedProducts = React.lazy(() => import('../../components/product/RelatedProducts'));

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [votes, setVotes] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoadingRelated, setIsLoadingRelated] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => {
        // Scroll to top whenever the slug changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

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
            setTimeout(() => setIsLoadingRelated(false), 2000);
        };

        const getListsVote = async () => {
            if (slug) {
                const id = slug.split('-').pop();
                const votesResponse = await apiVoteService.getListsVoteProducts({
                    page: 1,
                    page_size: 10,
                    product_id : id
                });
                setVotes(votesResponse.data.data);
                console.info("===========[] ===========[votesResponse] : ",votesResponse);
            }
        };

        fetchProduct().then(r => {});
        getProducts().then(r => {})
        getListsVote().then(r => {})
    }, [slug]);

    console.info("===========[] ===========[] : ",slug);
    if (!product) {
        return <div className="text-center my-5">Đang tải...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
    };

    const colors = ["primary", "secondary", "success", "danger", "info"];
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

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
                            {product?.labels.map((label) => (
                                <Badge key={label.id} bg={getRandomColor()} className="me-2">
                                    {label.name}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="product-title">{product.name}</h1>
                        <div className="d-flex align-items-center mb-2">
                            <div className="rating me-2">
                                { product.total_rating_score > 0 ? (
                                    renderStarsItem(product.total_rating_score / product.total_vote_count )
                                ) : (
                                    renderStarsItem(0)
                                )}
                                <span className="rating-count ms-1">({product.total_rating_score})</span>
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
            <DashboardVoteProduct product={product} votes={votes} />

            {/* Related Products Section */}
            <RelatedProducts relatedProducts={relatedProducts} isLoading={isLoadingRelated}/>
        </Container>
    );
};

export default ProductDetail;
