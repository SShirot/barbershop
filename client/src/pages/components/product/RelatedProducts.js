import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { formatPrice, createSlug, renderStarsItem } from '../../../helpers/formatters';



const RelatedProducts = ({relatedProducts}) => {

    return (
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
                                        { relatedProduct.total_rating_score > 0 ? (
                                            renderStarsItem(relatedProduct.total_rating_score / relatedProduct.total_vote_count )
                                        ) : (
                                            renderStarsItem(0)
                                        )}

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
    );
};

export default RelatedProducts;
