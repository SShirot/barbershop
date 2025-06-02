import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Form, Button, Spinner, Table, Card } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { FaSave, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import categoryService from './../../../../api/categoryService';
import productLabelService from '../../../../api/productLabelService';
import brandService from '../../../../api/brandService';
import attributeService from '../../../../api/apiAttributeService';
import attributeValueService from '../../../../api/apiAttributeValueService';
import { formatCurrencyInput } from '../../../../helpers/formatters';

const ProductModal = ({
                          showProductModal,
                          setShowProductModal,
                          editingProduct,
                          productImage,
                          handleImageChange,
                          handleAddEditProduct,
                          loading,
                      }) => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productLabels, setProductLabels] = useState([]);
    const [description, setDescription] = useState(editingProduct?.description || '');
    const [albumImages, setAlbumImages] = useState([]);
    const [previewAlbumImages, setPreviewAlbumImages] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});
    const [variants, setVariants] = useState([]);

    const defaultImage = process.env.REACT_APP_IMAGE_BASE_URL + "/default.png";

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categoriesRes, labelsRes, brandsRes, attributesRes] = await Promise.all([
                    categoryService.getLists({ page: 1, page_size: 1000 }),
                    productLabelService.getLists({ page: 1, page_size: 1000 }),
                    brandService.getLists({ page: 1, page_size: 1000 }),
                    attributeService.getLists({ page: 1, page_size: 1000 }),
                ]);

                setCategories(categoriesRes.data.data);
                setBrands(brandsRes.data.data);
                setProductLabels(labelsRes.data.data.map(label => ({
                    value: label.id,
                    label: label.name,
                })));
                setAttributes(attributesRes.data.data.map(attr => ({
                    value: attr.id,
                    label: attr.name,
                })));
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };

        fetchInitialData();
    }, []);


    const quillRef = useRef(null);

    const handleAlbumImageChange = (event) => {
        const files = Array.from(event.target.files);
        setAlbumImages(prevImages => [...prevImages, ...files]);

        const newPreviewUrls = files.map(file => ({
            url: URL.createObjectURL(file),
            file: file,
        }));

        setPreviewAlbumImages(prevPreviews => [...prevPreviews, ...newPreviewUrls]);
    };

    const removeAlbumImage = (index) => {
        setAlbumImages(prevImages => prevImages.filter((_, i) => i !== index));
        setPreviewAlbumImages(prevPreviews => {
            URL.revokeObjectURL(prevPreviews[index].url);
            return prevPreviews.filter((_, i) => i !== index);
        });
    };

    const handleSelectAttributes = async (selectedOptions) => {
        setSelectedAttributes(selectedOptions);

        const fetchValues = async (attributeId) => {
            try {
                const response = await attributeValueService.getLists({ attribute_id: attributeId });
                return response.data.data.map(value => ({
                    value: value.id,
                    label: value.title,
                    is_default: value.is_default
                }));
            } catch (error) {
                console.error('Error fetching attribute values:', error);
                return [];
            }
        };

        const valuesByAttribute = {};
        for (const attribute of selectedOptions) {
            valuesByAttribute[attribute.value] = await fetchValues(attribute.value);
        }
        setAttributeValues(valuesByAttribute);
    };

    const generateDefaultVariant = () => {
        const defaultCombination = selectedAttributes.map(attr => {
            const defaultValue = attributeValues[attr.value]?.find(value => value.is_default);
            return {
                attributeId: attr.value,
                value: defaultValue || attributeValues[attr.value]?.[0],
            };
        });

        setVariants([{
            attributes: defaultCombination,
            sku: '',
            price: '',
            stock: '',
            image: '',
        }]);
    };

    const addVariant = () => {
        const defaultCombination = selectedAttributes.map(attr => ({
            attributeId: attr.value,
            value: attributeValues[attr.value]?.[0],
        }));

        setVariants(prev => [
            ...prev,
            {
                attributes: defaultCombination,
                sku: '',
                price: '',
                stock: '',
                image: '',
            },
        ]);
    };

    const removeVariant = (index) => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };

    const updateVariant = (index, field, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][field] = value;
        setVariants(updatedVariants);
    };

    const updateVariantAttributeValue = (variantIndex, attributeId, value) => {
        const updatedVariants = [...variants];
        const attribute = updatedVariants[variantIndex].attributes.find(attr => attr.attributeId === attributeId);
        if (attribute) {
            attribute.value = value;
        }
        setVariants(updatedVariants);
    };

    const handleVariantImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const updatedVariants = [...variants];
            updatedVariants[index].image = file;
            setVariants(updatedVariants);
        }
    };

    return (
        <Modal
            show={showProductModal}
            onHide={() => setShowProductModal(false)}
            fullscreen
            className="product-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <Formik
                    initialValues={{
                        name: editingProduct?.name || '',
                        price: editingProduct?.price || '',
                        category: editingProduct?.category?.id || '',
                        brand: editingProduct?.brand?.id || '',
                        status: editingProduct?.status || 'pending',
                        number: editingProduct?.number || 0,
                        sale: editingProduct?.sale || 0,
                        productsLabels: editingProduct?.labels?.map(label => label.id) || [],
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Tên sản phẩm không được để trống'),
                        price: Yup.number().required('Giá sản phẩm không được để trống').positive('Giá phải là số dương'),
                        category: Yup.string().required('Danh mục không được để trống'),
                        brand: Yup.string().required('Thương hiệu không được để trống'),
                    })}
                    onSubmit={(values) => {
                        handleAddEditProduct({ ...values, description, productImage, albumImages, variants });
                    }}
                >
                    {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className="h-100 g-0">
                                <Col md={3} className="border-end">
                                    <div className="p-3 h-100 d-flex flex-column">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ảnh chính sản phẩm</Form.Label>
                                            <div className="main-image-preview mb-2">
                                                <img
                                                    src={productImage ? productImage : defaultImage}
                                                    alt="Main Product"
                                                    className="img-fluid"
                                                    style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <Form.Control type="file" onChange={handleImageChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Album ảnh sản phẩm</Form.Label>
                                            <div className="album-images-container">
                                                <Row className="g-2">
                                                    {previewAlbumImages.map((preview, index) => (
                                                        <Col key={index} xs={6}>
                                                            <Card className="position-relative">
                                                                <Card.Img
                                                                    variant="top"
                                                                    src={preview.url}
                                                                    style={{ height: '100px', objectFit: 'cover' }}
                                                                />
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    className="position-absolute top-0 end-0 m-1"
                                                                    onClick={() => removeAlbumImage(index)}
                                                                >
                                                                    <MdClose />
                                                                </Button>
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <div className="p-3">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tên sản phẩm</Form.Label>
                                            <Field name="name" className="form-control"/>
                                            <ErrorMessage name="name" component="div" className="text-danger"/>
                                        </Form.Group>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Giá</Form.Label>
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
                                                    <ErrorMessage name="price" component="div" className="text-danger"/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Số lượng</Form.Label>
                                                    <Field name="number" type="number" className="form-control"/>
                                                    <ErrorMessage name="number" component="div"
                                                                  className="text-danger"/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Trạng thái</Form.Label>
                                            <Field as="select" name="status" className="form-control">
                                                <option value="active">Hoạt động</option>
                                                <option value="inactive">Không hoạt động</option>
                                            </Field>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Mô tả</Form.Label>
                                            <ReactQuill
                                                ref={quillRef}
                                                value={description}
                                                onChange={setDescription}
                                                theme="snow"
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Danh mục</Form.Label>
                                                    <Field as="select" name="category" className="form-control">
                                                        <option value="">Chọn danh mục</option>
                                                        {categories.map(category => (
                                                            <option key={category.id}
                                                                    value={category.id}>{category.name}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="category" component="div"
                                                                  className="text-danger"/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Thương hiệu</Form.Label>
                                                    <Field as="select" name="brand" className="form-control">
                                                        <option value="">Chọn thương hiệu</option>
                                                        {brands.map(brand => (
                                                            <option key={brand.id}
                                                                    value={brand.id}>{brand.name}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="brand" component="div" className="text-danger"/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nhãn sản phẩm</Form.Label>
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
                                            <Form.Label>Thuộc tính sản phẩm</Form.Label>
                                            <Select
                                                isMulti
                                                options={attributes}
                                                value={selectedAttributes}
                                                onChange={handleSelectAttributes}
                                            />
                                        </Form.Group>
                                        {selectedAttributes.length > 0 && (
                                            <Button
                                                variant="primary"
                                                className="mb-3"
                                                onClick={generateDefaultVariant}
                                            >
                                                Tạo biến thể mặc định
                                            </Button>
                                        )}
                                        {variants.length > 0 && (
                                            <>
                                                <Table striped bordered>
                                                    <thead>
                                                    <tr>
                                                        <th>Thuộc tính</th>
                                                        <th>SKU</th>
                                                        <th>Giá</th>
                                                        <th>Số lượng</th>
                                                        <th>Hình ảnh</th>
                                                        <th>Hành động</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {variants.map((variant, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {variant.attributes.map(attr => (
                                                                    <div key={attr.attributeId}>
                                                                        {attributes.find(a => a.value === attr.attributeId)?.label}: {attr.value?.label}
                                                                    </div>
                                                                ))}
                                                            </td>
                                                            <td>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={variant.sku}
                                                                    onChange={(e) =>
                                                                        updateVariant(index, 'sku', e.target.value)
                                                                    }
                                                                />
                                                            </td>
                                                            <td>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={variant.price}
                                                                    onChange={(e) =>
                                                                        updateVariant(index, 'price', e.target.value)
                                                                    }
                                                                />
                                                            </td>
                                                            <td>
                                                                <Form.Control
                                                                    type="number"
                                                                    value={variant.stock}
                                                                    onChange={(e) =>
                                                                        updateVariant(index, 'stock', e.target.value)
                                                                    }
                                                                />
                                                            </td>
                                                            <td>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) =>
                                                                        handleVariantImageChange(e, index)
                                                                    }
                                                                />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={() => removeVariant(index)}
                                                                >
                                                                    Xóa
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </Table>
                                                <Button variant="success" onClick={addVariant}>
                                                    Thêm biến thể
                                                </Button>
                                            </>
                                        )}
                                        <div className="d-flex justify-content-end mt-3">
                                            <Button
                                                className="me-2"
                                                variant="secondary"
                                                onClick={() => setShowProductModal(false)}
                                            >
                                                Hủy bỏ
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                disabled={isSubmitting || loading}
                                            >
                                                {loading ? (
                                                    <Spinner size="sm" className="me-2"/>
                                                ) : (
                                                    <FaSave className="me-2"/>
                                                )}
                                                {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
