import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import categoryService from './../../../../api/categoryService';
import {formatCurrencyInput} from "../../../../helpers/formatters"; // Import categoryService để gọi API

const ProductModal = ({
                          showProductModal,
                          setShowProductModal,
                          editingProduct,
                          productImage,
                          defaultImage,
                          handleImageChange,
                          description,
                          setDescription,
                          handleAddEditProduct,
                          loading
                      }) => {
    const [categories, setCategories] = useState([]); // State để lưu danh sách categories

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getLists();
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <Modal show={showProductModal} onHide={() => setShowProductModal(false)} dialogClassName="modal-fullscreen">
            <Modal.Header closeButton>
                <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Row>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Form.Label>Product Image</Form.Label>
                                    <div className="product-image-preview mb-3">
                                        {loading ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            <img
                                                src={productImage || defaultImage}
                                                alt="Product"
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
                                        price: editingProduct?.price || '',
                                        category: editingProduct?.category?._id || '',
                                        status: editingProduct?.status || 'pending',
                                        number: editingProduct?.number || 0,
                                        sale: editingProduct?.sale || 0,
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string().required('Required'),
                                        price: Yup.number().required('Required').positive('Must be positive'),
                                        category: Yup.string().required('Required'),
                                    })}
                                    onSubmit={handleAddEditProduct}
                                >
                                    {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Field name="name" className="form-control" />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Price</Form.Label>
                                                <Field
                                                    name="price"
                                                    type="text"
                                                    className="form-control"
                                                    value={formatCurrencyInput(values.price.toString())}
                                                    onChange={(e) => {
                                                        const rawValue = e.target.value.replace(/\./g, "");
                                                        setFieldValue("price", rawValue);
                                                    }}
                                                />
                                                <ErrorMessage name="price" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Category</Form.Label>
                                                <Field as="select" name="category" className="form-control">
                                                    <option value="">Select a category</option>
                                                    {categories.map((category) => (
                                                        <option key={category._id} value={category._id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="category" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <ReactQuill
                                                    value={description}
                                                    onChange={setDescription}
                                                    theme="snow"
                                                />
                                            </Form.Group>

                                            <Button type="submit" variant="success" disabled={isSubmitting}>
                                                {editingProduct ? 'Update Product' : 'Add Product'}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
