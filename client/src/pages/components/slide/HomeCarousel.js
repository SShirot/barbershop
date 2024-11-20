import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './HomeCarousel.css';
import SlideOne from './../../../assets/images/slide1.jpg';
import SlideTwo from './../../../assets/images/slide2.jpg';
const slides = [
    {
        img: SlideOne,
        title: 'Slide 1',
        description: 'Description for Slide 1',
    },
    {
        img: SlideTwo,
        title: 'Slide 2',
        description: 'Description for Slide 2',
    }
];

const HomeCarousel = () => {
    return (
        <Carousel className="carousel-fullscreen">
            {slides.map((slide, idx) => (
                <Carousel.Item key={idx}>
                    <img
                        className="d-block w-100"
                        src={slide.img}
                        alt={slide.title}
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default HomeCarousel;
