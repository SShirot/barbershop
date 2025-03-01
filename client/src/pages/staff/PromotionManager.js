import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Pagination } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import promotionService from './../../api/promotionService';
import PromotionTable from './components/promotion/PromotionTable';
import PromotionFormModal from './components/promotion/PromotionFormModal';
import PromotionDeleteModal from './components/promotion/PromotionDeleteModal';

const PromotionManager = () => {
    const [promotions, setPromotions] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [showPromotionModal, setShowPromotionModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [promotionToDelete, setPromotionToDelete] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const fetchPromotionsWithParams = async (params) => {
        try {
            const response = await promotionService.getLists(params);
            setPromotions(response.data.promotions);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching promotions:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchPromotionsWithParams({ ...params, page: params.page || 1 });
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    const handleAddEditPromotion = async (values) => {
        try {
            console.info("===========[] ===========[Click] : ");
            if (editingPromotion) {
                const response = await promotionService.update(editingPromotion._id, values);
                setPromotions((prevPromotions) =>
                    prevPromotions.map((promotion) =>
                        promotion._id === editingPromotion._id ? response.data.promotion : promotion
                    )
                );
            } else {
                const response = await promotionService.add(values);
                setPromotions((prevPromotions) => [...prevPromotions, response.data.promotion]);
            }
            setEditingPromotion(null);
            setShowPromotionModal(false);
        } catch (error) {
            console.error("Error adding/updating promotion:", error);
        }
    };

    const handleDeletePromotion = async () => {
        try {
            await promotionService.delete(promotionToDelete._id);
            setPromotions((prevPromotions) => prevPromotions?.filter((promotion) => promotion._id !== promotionToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting promotion:", error);
        }
    };

    const openPromotionModal = (promotion = null) => {
        setEditingPromotion(promotion);
        setShowPromotionModal(true);
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
                            <Nav.Link as={Link} to="/staff/promotions">Promotions</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Manage Promotions</h2>
                        <div>
                            <Button variant="primary" onClick={() => openPromotionModal(null)}>
                                Add New Promotion
                            </Button>
                        </div>
                    </div>

                    <PromotionTable
                        promotions={promotions}
                        openPromotionModal={openPromotionModal}
                        setPromotionToDelete={setPromotionToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />

                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={meta.page === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(meta.page - 1)} disabled={meta.page === 1} />
                        {Array.from({ length: meta.total_page }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === meta.page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(meta.page + 1)} disabled={meta.page === meta.total_page} />
                        <Pagination.Last onClick={() => handlePageChange(meta.total_page)} disabled={meta.page === meta.total_page} />
                    </Pagination>
                </Col>
            </Row>

            <PromotionFormModal
                showPromotionModal={showPromotionModal}
                setShowPromotionModal={setShowPromotionModal}
                editingPromotion={editingPromotion}
                handleAddEditPromotion={handleAddEditPromotion}
            />

            <PromotionDeleteModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeletePromotion={handleDeletePromotion}
            />
        </Container>
    );
};

export default PromotionManager;
