import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import './ProductCarousel.css';
import { Link } from "react-router-dom";
import { formatPrice, createSlug, renderStarsItem } from '../../../helpers/formatters';

const chunkArray = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array?.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
};

const ProductCarousel = (props) => {
    const [title, setTitle] = useState('');
    const [showTitle, setShowTitle] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setTitle(props.title);
        setShowTitle(props.showTitle);
        if (props.products) {
            setProducts(props.products);
        }
    }, [props.title, props.showTitle, props.products]);

    const productChunks = chunkArray(products, 6);

    return (
        <Container>
            {showTitle && (
                <div className={'carousel-title'}>
                    <h6 className="text-start my-4">{title}</h6>
                </div>
            )}

            <Carousel>
                {productChunks.map((productChunk, idx) => (
                    <Carousel.Item key={idx}>
                        <Row>
                            {productChunk.map((product, idx) => (
                                <Col key={idx} xs={6} md={2} className="d-flex align-items-stretch item-prod">
                                    <Card className="mb-3 card-prod">
                                        <Nav.Link as={Link} to={`p/${createSlug(product.name)}-${product.id}`}>
                                            <Card.Img variant="top" src={product.avatar} alt={product.name} style={{ height: '200px' }} />
                                        </Nav.Link>
                                        <Card.Body>
                                            <Card.Title>
                                                <Nav.Link as={Link} to={`p/${createSlug(product.name)}-${product.id}`}>{product.name}</Nav.Link>
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
                                        <Button variant={product.status === 1 ? 'success' : 'danger'}>
                                            {product.status === 1 ? 'Còn hàng' : 'Hết hàng'}
                                        </Button>
                                    </Card>
                                </Col>

                            ))}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default ProductCarousel;
