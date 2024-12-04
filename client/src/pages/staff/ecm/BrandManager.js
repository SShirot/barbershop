import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Pagination, Breadcrumb, Nav} from 'react-bootstrap';
import {Link, useSearchParams} from "react-router-dom";
import brandService from '../../../api/brandService';
import {FaPlusCircle} from "react-icons/fa";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import {createSlug} from "../../../helpers/formatters";
import ModalData from "../components/brand/ModalData";
import BrandTable from "../components/brand/BrandTable";

const BrandManager = () => {
    const [brands, setBrands] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingCategory, setEditingCategory] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
    });

    const fetchCategoriesWithParams = async (params) => {
        try {
            const response = await brandService.getLists(params);
            setBrands(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchCategoriesWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
    }, [searchParams]);


    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchCriteria, page: newPage });
    };

    const handleAddEditCategory = async (values) => {
        setLoading(true);
        try {
            values = {
                ...values,
                slug : createSlug(values.name)
            }
            if (editingCategory) {
                const response = await brandService.update(editingCategory.id, {...editingCategory, ...values});
                const params = Object.fromEntries([...searchParams]);
                fetchCategoriesWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
            } else {
                const response = await brandService.add(values);
                const params = Object.fromEntries([...searchParams]);
                fetchCategoriesWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
            }
            setEditingCategory(null);
            setShowCategoryModal(false);
        } catch (error) {
            console.error("Error adding/updating category:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteData = async () => {
        try {
            await brandService.delete(categoryToDelete.id);

        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {

        }
        const params = Object.fromEntries([...searchParams]);
        await fetchCategoriesWithParams({...params, page: params.page || 1, page_size: params.page_size || 10});
        setShowDeleteModal(false);
    };

    const openCategoryModal = (category = null) => {
        setEditingCategory(category);
        setShowCategoryModal(true);
    };

    return (
        <Container>
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <Breadcrumb>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/ecommerce/brands">Thương hiệu</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Danh sách</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý thương hiệu</h2>
                        <div>
                            <Button size={'sm'} variant="primary" onClick={() => openCategoryModal(null)}>
                                Thêm mới <FaPlusCircle className={'mx-1'} />
                            </Button>
                        </div>
                    </div>
                    <BrandTable
                        brands={brands}
                        openCategoryModal={openCategoryModal}
                        setCategoryToDelete={setCategoryToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                    {meta && meta.total > 0 && (
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
                    )}
                </Col>
            </Row>

            <ModalData
                showCategoryModal={showCategoryModal}
                setShowCategoryModal={setShowCategoryModal}
                editingCategory={editingCategory}
                handleAddEditCategory={handleAddEditCategory}
                loading={loading}
            />

            <ModelConfirmDeleteData
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteData={handleDeleteData}
            />
        </Container>
    );
};

export default BrandManager;
