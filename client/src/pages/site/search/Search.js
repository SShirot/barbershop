import React, { useEffect, useState, useTransition } from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import { Container, Row, Col, Card, Dropdown, Pagination, Nav, Button, Form } from 'react-bootstrap';
import '../style/Category.css';
import '../../components/product/ProductCarousel.css';
import categoryService from '../../../api/categoryService';
import apiProductService from "../../../api/apiProductService";
import {createSlug, formatPrice, renderStarsItem} from "../../../helpers/formatters";
import apiBrandService from "../../../api/apiBrandService";

const CategorySkeleton = React.lazy(() => import('../../components/loading/CategorySkeleton'));
const ProductSkeleton = React.lazy(() => import('../../components/loading/ProductSkeleton'));

const Search = () => {
    const location = useLocation(); // Sử dụng useLocation để lấy query string
    const queryParams = new URLSearchParams(location.search); // Lấy query string
    const searchQuery = queryParams.get('q') || '';

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [labels, setLabels] = useState([]);  // Thêm state để lưu danh sách nhãn
    const [categoryName, setCategoryName] = useState('SẢN PHẨM');
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingBrands, setLoadingBrands] = useState(true);
    const [loadingLabels, setLoadingLabels] = useState(true);  // Thêm state loading cho labels
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isPending, startTransition] = useTransition();
    const [sortOption, setSortOption] = useState('newest');
    const [ratingFilter, setRatingFilter] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null); // Thêm state để lưu nhãn được chọn

    // Fetch danh sách categories
    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            try {
                const response = await categoryService.getListsGuest();
                setCategories(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setTimeout(() => setLoadingCategories(false), 1000);
            }
        };
        fetchCategories();
    }, []);

    // Fetch danh sách labels
    useEffect(() => {
        const fetchLabels = async () => {
            setLoadingLabels(true);
            try {
                const response = await apiProductService.getListsLabel();
                setLabels(response.data.data);
            } catch (error) {
                console.error("Error fetching labels:", error);
            } finally {
                setLoadingLabels(false);
                setTimeout(() => setLoadingLabels(false), 1000);
            }
        };
        fetchLabels();
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            setLoadingBrands(true);
            try {
                const response = await apiBrandService.getLists();
                setBrands(response.data.data);
            } catch (error) {
                console.error("Error fetching labels:", error);
            } finally {
                setLoadingBrands(false);
                setTimeout(() => setLoadingBrands(false), 1000);
            }
        };
        fetchBrands();
    }, []);

    // Fetch sản phẩm theo category và các tùy chọn sắp xếp/lọc
    useEffect(() => {
        startTransition(() => {
            setLoadingProducts(true);
            const fetchProducts = async () => {
                try {
                    const response = await apiProductService.getLists({
                        page: currentPage,
                        page_size: 10,
                        category_id: null,
                        sort: sortOption,
                        rating: ratingFilter,
                        label_id: selectedLabel,
                        name: searchQuery,
                    });
                    setProducts(response.data.data);
                    setTotalPages(response.data.meta.total_page);
                } catch (error) {
                    console.error("Error fetching products:", error);
                } finally {
                    setTimeout(() => setLoadingProducts(false), 1000);
                }
            };
            fetchProducts();
        });
    }, [categories, currentPage, sortOption, ratingFilter, selectedLabel]);

    // Xử lý thay đổi sắp xếp
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Xử lý lọc theo đánh giá
    const handleRatingFilterChange = (rating) => {
        setRatingFilter(rating);
    };

    // Xử lý lọc sản phẩm theo nhãn
    const handleLabelFilterChange = (labelId) => {
        setSelectedLabel(labelId);
    };

    return (
        <Container className="category-container">
            <Row>
                <Col md={9}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>{categoryName}</h4>
                    </div>
                    <Row>
                        {loadingProducts || isPending ? (
                            Array.from({ length: 8 }).map((_, idx) => (
                                <Col md={3} key={idx}>
                                    <ProductSkeleton />
                                </Col>
                            ))
                        ) : (
                            products.map((product, idx) => (
                                <Col md={3} key={idx} className={'item-prod'}>
                                    <Card className="mb-4 card-prod">
                                        {/*<Card.Img variant="top" src={product.avatar} />*/}
                                        <Nav.Link as={Link} to={`/p/${createSlug(product.name)}-${product.id}`}>
                                            <Card.Img variant="top" src={product.avatar} alt={product.name} style={{ height: '200px'}} />
                                        </Nav.Link>
                                        <Card.Body>
                                            <Card.Title>
                                                <Nav.Link as={Link}
                                                          to={`p/${createSlug(product.name)}-${product.id}`}>{product.name}</Nav.Link>
                                            </Card.Title>
                                            <div className="rating-small mb-2">
                                                {product.total_rating_score > 0 ? (
                                                    renderStarsItem(product.total_rating_score / product.total_vote_count)
                                                ) : (
                                                    renderStarsItem(0)
                                                )}
                                            </div>
                                            <Card.Text>{formatPrice(product.price)}</Card.Text>
                                        </Card.Body>
                                        <Button variant={product.status === "published" ? 'success' : 'danger'}>
                                            {product.status === 1 ? 'Còn hàng' : 'Hết hàng'}
                                        </Button>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                    {totalPages > 0 && (
                        <Pagination className="justify-content-center">
                            <Pagination.First onClick={() => setCurrentPage(1)} />
                            <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                            {[...Array(totalPages)].map((_, idx) => (
                                <Pagination.Item
                                    key={idx}
                                    active={idx + 1 === currentPage}
                                    onClick={() => setCurrentPage(idx + 1)}
                                >
                                    {idx + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                            <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
                        </Pagination>
                    )}
                </Col>
                <Col md={3}>
                    <h5 className="mt-4">Thương hiệu</h5>
                    {loadingBrands ? (
                        <CategorySkeleton/>
                    ) : (
                        <ul className="category-list">
                            {brands.map((brand) => (
                                <li key={brand.id} className=''>
                                    <Link to={`/c/${brand.slug}`}>{brand.name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Khối Sắp xếp */}
                    <h5 className="mt-4">Sắp xếp</h5>
                    <Form.Select aria-label="Sắp xếp" value={sortOption} onChange={handleSortChange}>
                        <option value="newest">Mới nhất</option>
                        <option value="oldest">Cũ nhất</option>
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
                    </Form.Select>

                    {/* Khối Lọc theo đánh giá */}
                    <h5 className="mt-4">Lọc theo đánh giá</h5>
                    <div className="rating-filter">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <Button
                                key={rating}
                                size={'sm'}
                                variant={ratingFilter === rating ? 'primary' : 'outline-primary'}
                                onClick={() => handleRatingFilterChange(rating)}
                                className="mb-2 me-2"
                            >
                                {rating} sao
                            </Button>
                        ))}
                        <Button
                            variant={!ratingFilter ? 'primary' : 'outline-primary'}
                            size={'sm'}
                            onClick={() => handleRatingFilterChange(null)}
                            className="mb-2 ms-2"
                        >
                            Tất cả
                        </Button>
                    </div>

                    {/* Khối Lọc theo nhãn */}
                    <h5 className="mt-4">Lọc theo nhãn</h5>
                    {loadingLabels ? (
                        <CategorySkeleton/>
                    ) : (
                        <div className="label-filter mb-4">
                            {labels.map((label) => (
                                <Button
                                    key={label.id}
                                    size="sm"
                                    variant={selectedLabel === label.id ? 'primary' : 'outline-primary'}
                                    onClick={() => handleLabelFilterChange(label.id)}
                                    className="mb-2 me-2"
                                >
                                    {label.name}
                                </Button>
                            ))}
                            <Button
                                variant={!selectedLabel ? 'primary' : 'outline-primary'}
                                size="sm"
                                onClick={() => handleLabelFilterChange(null)}
                                className="mb-2 me-2"
                            >
                                Tất cả
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Search;
