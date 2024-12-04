import React, { useState, useEffect, startTransition } from 'react';
import { Container, Navbar, Nav, Dropdown, Badge, Alert, Offcanvas } from 'react-bootstrap';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { loadUserFromLocalStorage, logout } from '../redux/slices/authSlice';
import categoryService from "../api/categoryService";
import apiSettingInformation from "../api/apiSettingInformation";
import { createSlug } from "../helpers/formatters";
import './style/GuestLayout.css';
import Header from "./include/header/Header";

const BookingModal = React.lazy(() => import('./include/BookingModal'));
const HomeCarousel = React.lazy(() => import('./../pages/components/slide/HomeCarousel'));
const Footer = React.lazy(() => import('./../pages/components/footer/Footer'));

const GuestLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const API = process.env.REACT_APP_API_BASE_URL;



    useEffect(() => {
        dispatch(loadUserFromLocalStorage());
    }, [dispatch]);

    const [showBooking, setShowBooking] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [information, setInformation] = useState([]);

    const handleBookingClose = () => setShowBooking(false);
    const handleBookingShow = () => setShowBooking(true);

    // Fetch danh mục sản phẩm
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getListsGuest({});
                setCategories(response.data.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSettingInfo = async () => {
            try {
                const response = await apiSettingInformation.getInfo({});
                setInformation(response.data?.data);
            } catch (error) {
                console.error('Failed to fetch settingInfo', error);
            }
        };

        fetchSettingInfo();
    }, []);

    return (
        <>
            <Header information={information} />
            <div style={{ height: '160px'}}></div>
            {successMessage && (
                <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
                    {successMessage}
                </Alert>
            )}
            {location.pathname === '/' && <HomeCarousel />}
            <Container>
                <Outlet />
            </Container>
            <Footer information={information}/>
            <BookingModal
                show={showBooking}
                handleClose={handleBookingClose}
                API={API}
                setSuccessMessage={setSuccessMessage}
            />
        </>
    );
};

export default GuestLayout;
