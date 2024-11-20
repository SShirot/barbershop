import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Pagination, Breadcrumb, Nav, Form, Image } from 'react-bootstrap';
import { Link, useSearchParams } from "react-router-dom";
import slideService from '../../../api/slideService';
import SlideTable from "../components/slide/SlideTable";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import apiUpload from "../../../api/apiUpload";

const SlideManager = () => {
    const [slides, setSlides] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingCategory, setEditingCategory] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
        page: searchParams.get('page') || 1,
        page_size: searchParams.get('page_size') || 10,
    });

    const openCategoryModal = (category = null) => {
        setEditingCategory(category);
        if(category.avatar) setImagePreview(category.avatar);
    };

    const fetchDataWithParams = async (params) => {
        try {
            const response = await slideService.getLists(params);
            setSlides(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching slides:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchDataWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
    }, [searchParams]);

    const handleImageUpload = async (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await apiUpload.uploadImage(file);
                console.info("===========[] ===========[] : ",response);
                setFieldValue("image_url", response.data);
                setImagePreview(response.data.url);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchCriteria, page: newPage });
    };

    const handleDeleteCategory = async () => {
        setLoading(true);
        try {
            await slideService.delete(categoryToDelete.id);
            setSlides((prevCategories) => prevCategories?.filter((category) => category.id !== categoryToDelete.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleAddEditCategory = async (values) => {
        setLoading(true);
        if(values.image_url) {
            values.avatar = values.image_url;
        }
        try {
            if (editingCategory) {
                await slideService.update(editingCategory.id, values);
            } else {
                await slideService.add(values);
            }
            setEditingCategory(null);
            setImagePreview(null);
            fetchDataWithParams({ page: 1, page_size: 10 });
        } catch (error) {
            console.error("Error adding/updating slide:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="mt-3">
                <Col xl={12}>
                    <Breadcrumb>
                        <Nav.Item><Nav.Link as={Link} to="/">Home</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link as={Link} to="/admin/slides">Slide</Nav.Link></Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="gutters mb-3">
                <Col xl={8}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý slides</h2>
                    </div>
                    <SlideTable
                        slides={slides}
                        openCategoryModal={openCategoryModal}
                        setCategoryToDelete={setCategoryToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                    {/* Pagination */}
                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={meta.page === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(meta.page - 1)} disabled={meta.page === 1} />
                        {/* Paginate based on total pages */}
                        {Array.from({ length: meta.total_page }, (_, index) => (
                            <Pagination.Item key={index} active={index + 1 === meta.page} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(meta.page + 1)} disabled={meta.page === meta.total_page} />
                        <Pagination.Last onClick={() => handlePageChange(meta.total_page)} disabled={meta.page === meta.total_page} />
                    </Pagination>
                </Col>

                <Col xl={4}>
                    <h2>{editingCategory ? 'Cập nhật Slide' : 'Thêm mới Slide'}</h2>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: editingCategory?.name || '',
                            link: editingCategory?.link || '',
                            description: editingCategory?.description || '',
                            image_url: editingCategory?.avatar || ''
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required('Tên danh mục không được để trống'),
                            link: Yup.string().url('Link không hợp lệ').required('Link không được để trống'),
                            description: Yup.string().required('Mô tả không được để trống')
                        })}
                        onSubmit={handleAddEditCategory}
                    >
                        {({ handleSubmit, setFieldValue }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tiêu đề</Form.Label>
                                    <Field name="name" className="form-control" />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Link</Form.Label>
                                    <Field name="link" className="form-control" />
                                    <ErrorMessage name="link" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Field name="description" className="form-control" as="textarea" rows={3} />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Ảnh</Form.Label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(event) => handleImageUpload(event, setFieldValue)}
                                    />
                                    {imagePreview && <Image src={imagePreview} alt="Preview" style={{ width: "100%",height: 'auto'}}  className="mt-2" />}
                                </Form.Group>

                                <Button type="submit" variant="success" className="w-100">
                                    {editingCategory ? 'Cập nhật' : 'Thêm mới'}
                                </Button>
                            </Form>
                        )}
                    </Formik>

                </Col>
            </Row>

            {/*<CategoryDeleteConfirmationModal*/}
            {/*    showDeleteModal={showDeleteModal}*/}
            {/*    setShowDeleteModal={setShowDeleteModal}*/}
            {/*    handleDeleteCategory={handleDeleteCategory}*/}
            {/*    loading={loading}*/}
            {/*/>*/}
        </Container>
    );
};

export default SlideManager;
