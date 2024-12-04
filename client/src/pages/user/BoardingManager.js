import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Pagination, Breadcrumb, Nav
} from 'react-bootstrap';
import {Link, useSearchParams} from "react-router-dom";
import boardingApi from './../../api/boardingApi';
import BoardingTable from './components/boarding/BoardingTable';
import BoardingModal from './components/boarding/BoardingModal';
import DeleteConfirmationModal from './components/boarding/DeleteConfirmationModal';
import SearchModal from './components/boarding/SearchModal';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const BoardingManager = () => {
    const [boardings, setBoardings] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingBoarding, setEditingBoarding] = useState(null);
    const [showBoardingModal, setShowBoardingModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [boardingToDelete, setBoardingToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        petName: searchParams.get('petName') || '',
        status: searchParams.get('status') || '',
    });

    const fetchBoardingsWithParams = async (params) => {
        try {
            const response = await boardingApi.getLists(params);
            setBoardings(response.data.boardings);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching boardings:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchBoardingsWithParams({ ...params, page: params.page || 1 });
    }, [searchParams]);

    const handleSearch = (value, key) => {
        setSearchCriteria((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchSubmit = () => {
        const newParams = { ...searchCriteria, page: 1 };
        setSearchParams(newParams);
        setShowSearchModal(false);
    };

    const handleResetSearch = () => {
        setSearchCriteria({ petName: '', status: '' });
        setSearchParams({});
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchCriteria, page: newPage });
    };

    const handleAddEditBoarding = async (values) => {
        try {
            if (editingBoarding) {
                const response = await boardingApi.updateBoarding(editingBoarding._id, values);
                setBoardings((prevBoardings) =>
                    prevBoardings.map((boarding) =>
                        boarding._id === editingBoarding._id ? response.data.boarding : boarding
                    )
                );
            } else {
                const response = await boardingApi.addBoarding(values);
                setBoardings((prevBoardings) => [...prevBoardings, response.data.boarding]);
            }
            setEditingBoarding(null);
            setShowBoardingModal(false);
        } catch (error) {
            console.error("Error adding/updating boarding:", error);
        }
    };

    const handleDeleteBoarding = async () => {
        try {
            await boardingApi.delete(boardingToDelete._id);
            setBoardings((prevBoardings) => prevBoardings?.filter((boarding) => boarding._id !== boardingToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting boarding:", error);
        }
    };

    const openBoardingModal = (boarding = null) => {
        setEditingBoarding(boarding);
        setShowBoardingModal(true);
    };

    return (
        <Container>
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <Breadcrumb>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/user/posts">Posts</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Manage Boardings</h2>
                        <div>
                            {/*<Button variant="secondary" className="me-2" onClick={() => setShowSearchModal(true)}>*/}
                            {/*    Search*/}
                            {/*</Button>*/}
                            {/*<Button variant="primary" onClick={() => openBoardingModal(null)}>*/}
                            {/*    Add New Boarding*/}
                            {/*</Button>*/}
                        </div>
                    </div>
                    <BoardingTable
                        boardings={boardings}
                        formatCurrency={formatCurrency}
                        openBoardingModal={openBoardingModal}
                        setBoardingToDelete={setBoardingToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={meta.page === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(meta.page - 1)}
                            disabled={meta.page === 1}
                        />
                        {Array.from({ length: meta.total_page }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === meta.page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(meta.page + 1)}
                            disabled={meta.page === meta.total_page}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(meta.total_page)}
                            disabled={meta.page === meta.total_page}
                        />
                    </Pagination>
                </Col>
            </Row>

            <BoardingModal
                showBoardingModal={showBoardingModal}
                setShowBoardingModal={setShowBoardingModal}
                editingBoarding={editingBoarding}
                handleAddEditBoarding={handleAddEditBoarding}
                loading={loading}
            />

            <DeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteBoarding={handleDeleteBoarding}
            />

            <SearchModal
                showSearchModal={showSearchModal}
                setShowSearchModal={setShowSearchModal}
                searchCriteria={searchCriteria}
                handleSearch={handleSearch}
                handleSearchSubmit={handleSearchSubmit}
                handleResetSearch={handleResetSearch}
            />
        </Container>
    );
};

export default BoardingManager;
