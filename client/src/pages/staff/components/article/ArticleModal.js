import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';

import menuService from "../../../../api/menuService";
import tagService from "../../../../api/tagService";
import {FaSave} from "react-icons/fa"; // Import categoryService để gọi API

const statusConfig = [
    {
        id : "pending",
        name : "Pending"
    },
    {
        id : "published",
        name : "Published"
    },
]

const ArticleModal = ({
                          showProductModal,
                          setShowProductModal,
                          editingProduct,
                          imageData,
                          defaultImage,
                          handleImageChange,
                          content,
                          setContent,
                          handleAddEditProduct,
                          loading,
                          selectedTags,
                          setSelectedTags
                      }) => {
    const [menus, setMenus] = useState([]); // State để lưu danh sách categories
    const [tags, setTags] = useState([]);

    // const [selectedTags, setSelectedTags] = useState([]);
    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions);
    };
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await tagService.getLists({
                    page: 1,
                    page_size: 1000
                });
                const options = response.data.data.map(tag => ({
                    value: tag.id,
                    label: tag.name
                }));
                setTags(options);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await menuService.getLists({
                    page: 1,
                    page_size: 1000
                });
                setMenus(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchMenus();
    }, []);

    return (
        <Modal show={showProductModal} onHide={() => setShowProductModal(false)} dialogClassName="modal-fullscreen">
            <Modal.Header closeButton>
                <Modal.Title>{editingProduct ? 'Cập nhật bài viết' : 'Thêm mới bài viết'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Row>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Form.Label>Hình ảnh</Form.Label>
                                    <div className="product-image-preview mb-3">
                                        {loading ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            <img
                                                src={imageData || defaultImage}
                                                alt="Article"
                                                className="img-fluid"
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        )}
                                    </div>
                                    <Form.Control type="file" onChange={handleImageChange} />
                                </div>
                            </Col>
                            <Col md={8}>
                                <Formik
                                    initialValues={{
                                        name: editingProduct?.name || '',
                                        description: editingProduct?.description || '',
                                        menuId: editingProduct?.menu_id || '',
										is_featured: editingProduct?.is_featured || 1,
										views: editingProduct?.views || 0,
                                        content: editingProduct?.menu?.content || '',
                                        status: editingProduct?.menu?.status || 'pending',
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string().required('Tên bài viết không được để trống'),
                                        description: Yup.string().required('Mô tả không được để trống'),
                                        menuId: Yup.string().required('Chuyên mục không được để trống'),
                                        // content: Yup.string().required('Required'),
                                        status: Yup.string().required('Trạng thái không được để trống'),
                                    })}
                                    onSubmit={handleAddEditProduct}
                                >
                                    {({ handleSubmit, setFieldValue, values, isSubmitting }) => {
                                        console.log("Form Values:", values);
                                        // console.log("Form Errors:", errors);
                                        console.log("Is Submitting:", isSubmitting);
                                        return (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Tên bài viết</Form.Label>
                                                <Field name="name" className="form-control" />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Mô tả</Form.Label>
                                                <Field
                                                    name="description"
                                                    type="text"
                                                    className="form-control"
                                                />
                                                <ErrorMessage name="description" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Chuyên mục</Form.Label>
                                                <Field as="select" name="menuId" className="form-control">
                                                    <option value="">Select a menu</option>
                                                    {menus.map((menu) => (
                                                        <option key={menu.id} value={menu.id}>
                                                            {menu.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="menu" component="div" className="text-danger" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Từ khoá</Form.Label>
                                                <Select
                                                    isMulti
                                                    options={tags}
                                                    value={selectedTags}
                                                    onChange={handleTagChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Trạng thái</Form.Label>
                                                <Field as="select" name="status" className="form-control">
                                                    <option value="">Chọn trạng thái</option>
                                                    {statusConfig.map((menu) => (
                                                        <option key={menu.id} value={menu.id}>
                                                            {menu.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="status" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Nội dung</Form.Label>
                                                <ReactQuill
                                                    value={content}
                                                    onChange={setContent}
                                                    theme="snow"
                                                />
                                            </Form.Group>

                                            <Button className="d-flex justify-content-between align-items-center" type="submit" size={'sm'} variant="primary" disabled={isSubmitting}>
                                                {editingProduct ? 'Cập nhật' : 'Thêm mới'} <FaSave className="ms-2" />
                                            </Button>
                                        </Form>
                                        )
                                    }}
                                </Formik>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ArticleModal;
