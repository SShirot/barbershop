import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {Container, Row, Col, Card, Dropdown, Pagination, Nav, Button} from 'react-bootstrap';
import './style/Category.css';
import './../components/product/ProductCarousel.css';

const categories = [
    'PATE',
    'THỨC ĂN HẠT',
    'BÁNH THƯỞNG',
    'THỰC PHẨM CHỨC NĂNG',
    'ĐỒ CHƠI',
    'DỤNG CỤ',
    'PHỤ KIỆN',
    'VỆ SINH'
];

const products = [
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/thit-ga2780_560x560.jpg',
        title: 'Bánh thưởng cho chó vị thịt gà JERHIGH Chicken Jerky',
        price: '49.000vnđ',
        status: 'Tạm hết hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/ga-ca-rot2738_560x560.jpg',
        title: 'Bánh thưởng cho chó vị cà rốt JERHIGH Carrot Sticks',
        price: '49.000vnđ',
        status: 'Tạm hết hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/bacon4841_560x560.jpg',
        title: 'Bánh thưởng cho chó vị thịt xông khói JERHIGH Bacon',
        price: '49.000vnđ',
        status: 'Tạm hết hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/wanpy-xot-kem-thuong-vi-ga-70gr2144_560x560.png',
        title: 'WANPY XỐT KEM THƯỞNG CHO MÈO 70G',
        price: '29.000vnđ',
        status: 'Còn hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/pate-moochiee6243_560x560.png',
        title: 'Thức ăn cho mèo Moochie',
        price: '19.000vnđ',
        status: 'Còn hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/lapaw-375g1861_560x560.jpg',
        title: 'Pate Mèo Mọi Lứa Tuổi LaPaw 375g',
        price: '65.000vnđ',
        status: 'Còn hàng',
    },
];

const Category = () => {
    const { slug } = useParams();

    // Fetch category data based on slug (use effect or data fetching logic here)

    return (
        <Container className="category-container">
            <Row>
                <Col md={3}>
                    <h4>DANH MỤC SẢN PHẨM</h4>
                    <ul className="category-list">
                        {categories.map((category, idx) => (
                            <li key={idx}><a href={`/c/${category.toLowerCase().replace(/ /g, '-')}`}>{category}</a></li>
                        ))}
                    </ul>
                </Col>
                <Col md={9}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>{slug.toUpperCase()}</h4>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Sản phẩm nổi bật
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Giá tăng dần</Dropdown.Item>
                                <Dropdown.Item href="#">Giá giảm dần</Dropdown.Item>
                                <Dropdown.Item href="#">Mới nhất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Row>
                        {products.map((product, idx) => (
                            <Col md={3} key={idx} className={'item-prod'}>
                                <Card className="mb-4  card-prod">
                                    <Card.Img variant="top" src={product.img} />
                                    <Card.Body>
                                        <Card.Title>
                                            <Nav.Link as={Link} to="/">{product.title}</Nav.Link>
                                        </Card.Title>
                                        <Card.Text>{product.price}</Card.Text>
                                    </Card.Body>
                                    <Button variant={product.status === 'Còn hàng' ? 'success' : 'danger'}>
                                        {product.status}
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Pagination className="justify-content-center">
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Item>{3}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default Category;
