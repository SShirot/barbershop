// import React from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import './ServiceCards.css';

// const services = [
//     {
//         title: 'HOTEL SERVICE',
//         description: 'READ MORE',
//         icon: 'https://www.petstation.vn/upload/hinhanh/logo-2206.png',
//     },
//     {
//         title: 'SPA - GROOMING',
//         description: 'READ MORE',
//         icon: 'https://www.petstation.vn/upload/hinhanh/logo-2206.png',
//     },
//     {
//         title: 'OTHER SERVICE',
//         description: 'READ MORE',
//         icon: 'https://www.petstation.vn/upload/hinhanh/logo-2206.png',
//     },
// ];

// const ServiceCards = () => {
//     return (
//         <Container className="my-5">
//             <Row className="justify-content-center">
//                 {services.map((service, idx) => (
//                     <Col key={idx} md={4} className="d-flex align-items-stretch">
//                         <div className="service-card text-center w-100">
//                             <Card.Body>
//                                 <img src={service.icon} alt={service.title} className="service-icon mb-3" />
//                                 <Card.Title className="mb-3">{service.title}</Card.Title>
//                                 <Card.Text>{service.description}</Card.Text>
//                                 <Button variant="link" className="text-white">READ MORE</Button>
//                             </Card.Body>
//                         </div>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default ServiceCards;
