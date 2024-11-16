import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Pagination, Breadcrumb, Nav} from 'react-bootstrap';
import {Link, useSearchParams} from "react-router-dom";
import categoryService from '../../../api/categoryService';
import CategoryModal from '../components/category/CategoryModal';
import CategorySearchModal from '../components/category/CategorySearchModal';
import productLabelService from "../../../api/productLabelService";
import ProductLabelTable from "../components/productLabel/ProductLabelTable";
import {FaPlusCircle} from "react-icons/fa";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import moment from 'moment';
import {createSlug} from "../../../helpers/formatters";

const ProductLabelManager = () => {
    const [productLabels, setProductLabel] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingCategory, setEditingCategory] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
    });

    const fetchCategoriesWithParams = async (params) => {
        try {
            const response = await productLabelService.getLists(params);
            setProductLabel(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching productLabels:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchCategoriesWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
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
        setSearchCriteria({ name: '' });
        setSearchParams({});
    };

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
                const response = await productLabelService.update(editingCategory.id, {...editingCategory,updated_at: moment().format('YYYY-MM-DD HH:mm:ss'), ...values } );

            } else {
                const response = await productLabelService.add(values);
            }
            const params = Object.fromEntries([...searchParams]);
            fetchCategoriesWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
            setEditingCategory(null);
            setShowCategoryModal(false);
        } catch (error) {
            console.error("Error adding/updating category:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteData = async () => {
        setLoading(true);
        try {
            await productLabelService.delete(categoryToDelete.id);
            const params = Object.fromEntries([...searchParams]);
            fetchCategoriesWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });

            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {
            setLoading(false);
        }
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
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/ecommerce/product-labels">Product Label</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Nhãn sản phẩm</h2>
                        <div>
                            <Button size={'sm'} variant="primary" onClick={() => openCategoryModal(null)}>
                                Thêm mới <FaPlusCircle className={'mx-1'} />
                            </Button>
                        </div>
                    </div>
                    <ProductLabelTable
                        productLabels={productLabels}
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

            <CategoryModal
                showCategoryModal={showCategoryModal}
                setShowCategoryModal={setShowCategoryModal}
                editingCategory={editingCategory}
                handleAddEditCategory={handleAddEditCategory}
                loading={loading}
            />

            {/*<CategoryDeleteConfirmationModal*/}
            {/*    showDeleteModal={showDeleteModal}*/}
            {/*    setShowDeleteModal={setShowDeleteModal}*/}
            {/*    handleDeleteCategory={handleDeleteCategory}*/}
            {/*    loading={loading}*/}
            {/*/>*/}

            <ModelConfirmDeleteData
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteData={handleDeleteData}
            />

            <CategorySearchModal
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

export default ProductLabelManager;
