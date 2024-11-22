import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './HomeCarousel.css';
import slideService from "./../../../api/slideService";


const HomeCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hàm gọi API để lấy danh sách slide
        const fetchSlides = async () => {
            try {
                const response = await slideService.getListsGuest({});
                setSlides(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching slides:", error);
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);
    return (
        <Carousel className="carousel-fullscreen">
            {slides.map((slide, idx) => (
                <Carousel.Item key={idx}>
                    <img
                        className="d-block w-100"
                        src={slide.avatar}
                        alt={slide.name}
                    />
                    <Carousel.Caption>
                        <h3>{slide.name}</h3>
                        <p>{slide.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default HomeCarousel;
