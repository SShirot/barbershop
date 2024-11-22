import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import './ProductCarousel.css';
import { Link } from "react-router-dom";
import { formatPrice, createSlug } from '../../../helpers/formatters';

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
            {/*{showTitle && (*/}
            {/*    <div className={'carousel-title'}>*/}
            {/*        <h2 className="text-center my-4">{title}</h2>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*<p className="text-center mb-4">Các loại hạt, pate, bánh thưởng thơm ngon, bổ dưỡng cho Boss</p>*/}
            <Carousel>
                {productChunks.map((productChunk, idx) => (
                    <Carousel.Item key={idx}>
                        <Row>
                            {productChunk.map((product, idx) => (
                                <Col key={idx} md={2} className="d-flex align-items-stretch item-prod">
                                    <Card className="mb-3 card-prod">
                                        <Nav.Link as={Link} to={`p/${createSlug(product.name)}-${product.id}`}>
                                            <Card.Img variant="top" src={product.avatar} alt={product.name} style={{ height: '200px'}} />
                                        </Nav.Link>
                                        <Card.Body>
                                            <Card.Title>
                                                <Nav.Link as={Link} to={`p/${createSlug(product.name)}-${product.id}`}>{product.name}</Nav.Link>
                                            </Card.Title>
                                            <Card.Text>{formatPrice(product.price)}</Card.Text>
                                        </Card.Body>
                                        {/*<Button variant={product.status === 'Còn hàng' ? 'success' : 'danger'}>*/}
                                        {/*    {product.status}*/}
                                        {/*</Button>*/}
                                        <Button variant={product.status = 1 ? 'success' : 'danger'}>
                                            Còn hàng
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
