import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Pagination } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import menuService from '../../../api/menuService';
import MenuDeleteModal from '../components/menu/MenuDeleteModal';
import ServiceTable from "../components/service/ServiceTable";
import serviceService from "../../../api/serviceService";
import ServiceFormModal from "../components/service/ServiceFormModal";
import {formatCurrencyInput} from "../../../helpers/formatters";
import articleService from "../../../api/articleService";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import {FaPlusCircle} from "react-icons/fa";

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingService, setEditingMenu] = useState(null);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
    });

    const fetchServiceWithParams = async (params) => {
        try {
            const response = await serviceService.getStaffServices(params);
            setServices(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching menus:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchServiceWithParams({...params, page: params.page || 1, page_size: params.page_size || 10}).then(r =>{});
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchCriteria, page: newPage });
    };

    const handleAddEditService = async (values) => {
        console.info("===========[] ===========[values] : ",values);

        const modelData = {
            ...values,
            is_home_service: values?.is_home_service ? 1 : 0,
            price: Number(values?.price?.toString()?.replace(/\./g, '') || 0)
        };
        try {
            if (editingService) {
                await serviceService.updateStaffService(editingService.id, modelData);
                const params = Object.fromEntries([...searchParams]);
                await fetchServiceWithParams({...params, page: params.page || 1, page_size: params.page_size || 10});
            } else {
                await serviceService.addStaffService(modelData);
                const params = Object.fromEntries([...searchParams]);
                await fetchServiceWithParams({...params, page: params.page || 1, page_size: params.page_size || 10});
            }
            setEditingMenu(null);
            setShowServiceModal(false);
        } catch (error) {
            console.error("Error adding/updating menu:", error);
        }
    };

    const openServiceModal = (service = null) => {
        setEditingMenu(service);
        setShowServiceModal(true);
    };

    const handleDeleteData = async () => {
        try {
            await serviceService.deleteStaffService(serviceToDelete.id);
            const params = Object.fromEntries([...searchParams]);
            fetchServiceWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
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
                            <Nav.Link as={Link} to="/staff/services">Dịch vụ</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý dịch vụ</h2>
                        <div>
                            <Button variant="primary" size={'sm'} onClick={() => openServiceModal(null)}>
                                Thêm mới <FaPlusCircle className={'mx-1'} />
                            </Button>
                        </div>
                    </div>

                    <ServiceTable
                        services={services}
                        openServiceModal={openServiceModal}
                        setServiceToDelete={setServiceToDelete}
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

            <ServiceFormModal
                showServiceModal={showServiceModal}
                setShowServiceModal={setShowServiceModal}
                editingService={editingService}
                handleAddEditService={handleAddEditService}
                formatCurrencyInput={formatCurrencyInput}
            />

            <ModelConfirmDeleteData
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteData={handleDeleteData}
            />
        </Container>
    );
};

export default ServiceManager;
