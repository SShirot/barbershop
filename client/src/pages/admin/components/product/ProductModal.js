import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import categoryService from './../../../../api/categoryService';
import {formatCurrencyInput} from "../../../../helpers/formatters";
import productLabelService from "../../../../api/productLabelService";
import Select from "react-select";
import {FaSave} from "react-icons/fa"; // Import categoryService để gọi API

const ProductModal = ({
                          showProductModal,
                          setShowProductModal,
                          editingProduct,
                          productImage,
                          handleImageChange,
                          description,
                          setDescription,
                          handleAddEditProduct,
                          loading
                      }) => {
    const [categories, setCategories] = useState([]); // State để lưu danh sách categories
    const [productLabels, setProductLabels] = useState([]);
    const defaultImage = "https://via.placeholder.com/150";
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getLists({
                    page: 1,
                    page_size: 1000
                });
                setCategories(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories().then(r => {});
        fetchProductLabels().then(r => {});
    }, []);

    const fetchProductLabels = async () => {
        try {
            const response = await productLabelService.getLists({
                page: 1,
                page_size: 1000
            });
            setProductLabels(response.data.data.map(label => ({
                value: label.id,
                label: label.name
            })));
        } catch (error) {
            console.error("Error fetching product labels:", error);
        }
    };

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
                                        category: editingProduct?.category?.id || '',
										status: editingProduct?.status || 'pending',
                                        number: editingProduct?.number || 0,
                                        sale: editingProduct?.sale || 0,
                                        productsLabels: editingProduct?.labels?.map(label => label.id) || [],
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string().required('Tên sản phẩm không được để trống'),
                                        price: Yup.number().required('Giá sản phẩm không được để trống').positive('Giá phải là số'),
                                        category: Yup.string().required('Danh mục không được để trống'),
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

                                            <Row>
                                                <Col md={6}>
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
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Số lượng</Form.Label>
                                                        <Field
                                                            name="number"
                                                            type="number"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage name="number" component="div" className="text-danger" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Category</Form.Label>
                                                <Field as="select" name="category" className="form-control">
                                                    <option value="">Select a category</option>
                                                    {categories.map((category) => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="category" component="div" className="text-danger" />
                                            </Form.Group>
                                            {/*<Form.Group className="mb-3">*/}
                                            {/*    <Form.Label>Product Labels</Form.Label>*/}
                                            {/*    <Select*/}
                                            {/*        isMulti*/}
                                            {/*        options={productLabels}*/}
                                            {/*        value={productLabels?.filter(label => values.productsLabels.includes(label.value))}*/}
                                            {/*        onChange={(selectedOptions) => {*/}
                                            {/*            const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];*/}
                                            {/*            setFieldValue("productsLabels", selectedValues);*/}
                                            {/*        }}*/}
                                            {/*    />*/}
                                            {/*</Form.Group>*/}

                                            <Form.Group className="mb-3">
                                                <Form.Label>Product Labels</Form.Label>
                                                <Select
                                                    isMulti
                                                    options={productLabels}
                                                    value={productLabels?.filter(label => values.productsLabels.includes(label.value))}
                                                    onChange={(selectedOptions) => {
                                                        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                                        setFieldValue("productsLabels", selectedValues);
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <ReactQuill
                                                    value={description}
                                                    onChange={setDescription}
                                                    theme="snow"
                                                />
                                            </Form.Group>
                                            <Button className="d-flex justify-content-between align-items-center" type="submit" size={'sm'} variant="primary" disabled={isSubmitting}>
                                                {editingProduct ? 'Cập nhật' : 'Thêm mới'} <FaSave className="ms-2" />
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
