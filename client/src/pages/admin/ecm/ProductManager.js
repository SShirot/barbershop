import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, Col, Container, Dropdown, Image, Nav, Pagination, Row, Table} from 'react-bootstrap';
import productService from '../../../api/productService';
import {Link, useSearchParams} from "react-router-dom";
import ProductModal from '../components/product/ProductModal';
import DeleteConfirmationModal from '../components/product/ProductDeleteConfirmationModal';
import apiUpload from "../../../api/apiUpload";
import {FaEdit, FaPlusCircle, FaTrash} from "react-icons/fa";
import {createSlug} from "../../../helpers/formatters";

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingProduct, setEditingProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewAlbumImages, setPreviewAlbumImages] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const defaultImage = "https://via.placeholder.com/150";

    const fetchProducts = async (params) => {
        try {
            const response = await productService.getLists(params);
            setProducts(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchProducts({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
    }, [searchParams]);

    const handleAddEditProduct = async (values) => {
        const productData = {
            ...values,
            price: Number(values.price, 10),
            avatar: productImage || editingProduct?.avatar || defaultImage,
            content: description,
            categoryId: values.category,
            slug: createSlug(values.name)
        };
        try {

            // Upload từng ảnh trong mảng `values.album` và lấy link ảnh
            if (values.albumImages && values.albumImages.length > 0) {
                productData.images = await Promise.all(
                    values.albumImages.map(async (file) => {
                        const response = await apiUpload.uploadImage(file);
                        return response.data; // Giả sử `response.data` chứa link ảnh sau khi upload
                    })
                );
            }

            console.info("===========[] ===========[productData] : ",productData);

            if (editingProduct) {
                await productService.update(editingProduct.id, productData);
            } else {
                await productService.add(productData);
            }
            setEditingProduct(null);
            setShowProductModal(false);
            const params = Object.fromEntries([...searchParams]);
            fetchProducts({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
        } catch (error) {
            console.error("Error adding/updating product:", error);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const response = await apiUpload.uploadImage(file);
                setProductImage(response.data);
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteProduct = async () => {
        try {
            await productService.delete(productToDelete.id);
            const params = Object.fromEntries([...searchParams]);
            fetchProducts({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // const openProductModal = (product = null) => {
    //     setEditingProduct(product);
    //     setShowProductModal(true);
    //     if (product !== null) setProductImage(product.avatar);
    // };
    const openProductModal = (product = null) => {
        setEditingProduct(product);
        setShowProductModal(true);

        if (product !== null) {
            setProductImage(product.avatar);
            // Nếu sản phẩm có album, chuyển album thành mảng đối tượng xem trước
            if (product.images) {
                setPreviewAlbumImages(
                    product.images.map((imageUrl) => ({
                        url: imageUrl,
                        file: null, // Để trống vì đây là ảnh đã tồn tại
                    }))
                );
            } else {
                setPreviewAlbumImages([]);
            }
        } else {
            setPreviewAlbumImages([]);
        }
    };


    const handlePageChange = (page) => {
        setSearchParams({ ...Object.fromEntries([...searchParams]), page });
        fetchProducts({ ...Object.fromEntries([...searchParams]), page });
    };

    const handlePageSizeChange = (eventKey) => {
        const pageSize = Number(eventKey);
        setSearchParams({ ...Object.fromEntries([...searchParams]), page_size: pageSize, page: 1 });
        fetchProducts({ ...Object.fromEntries([...searchParams]), page_size: pageSize, page: 1 });
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
                            <Nav.Link as={Link} to="/admin/ecommerce/product">Sản phẩm</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý sản phẩm</h2>
                        <Button size={'sm'} variant="primary" onClick={() => openProductModal(null)}>
                            Thêm mới <FaPlusCircle className={'mx-1'} />
                        </Button>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Tên sản phẩm</th>
                            <th>Danh mục</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Nhãn</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <tr key={product?.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image src={product?.avatar || defaultImage} alt="Product avatar" rounded style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td>{product?.name} <br /><span>{product?.slug}</span></td>
                                <td>{product?.category?.name}</td>
                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</td>
                                <td>{product?.number}</td>
                                <td>
                                    {product?.labels && product.labels.length > 0 ? (
                                        product.labels.map((label) => (
                                            <span key={label.id} className="badge bg-secondary me-1">
                                                    {label.name}
                                                </span>
                                        ))
                                    ) : (
                                        <span className="text-muted">Chưa có nhãn</span>
                                    )}
                                </td>
                                <td>
                                    <Button size="sm" variant="primary" onClick={() => openProductModal(product)} title="Cập nhật">
                                        <FaEdit />
                                    </Button>
                                    <Button size="sm" className={'ms-2'} variant="danger" onClick={() => { setProductToDelete(product); setShowDeleteModal(true); }} title="Xoá">
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <Dropdown onSelect={handlePageSizeChange}>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Hiển thị: {meta.page_size}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="10">10</Dropdown.Item>
                                <Dropdown.Item eventKey="20">20</Dropdown.Item>
                                <Dropdown.Item eventKey="50">50</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Pagination>
                            <Pagination.First onClick={() => handlePageChange(1)} disabled={meta.page === 1} />
                            <Pagination.Prev onClick={() => handlePageChange(Math.max(meta.page - 1, 1))} disabled={meta.page === 1} />
                            {[...Array(meta.total_page)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === meta.page}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(Math.min(meta.page + 1, meta.total_page))} disabled={meta.page === meta.total_page} />
                            <Pagination.Last onClick={() => handlePageChange(meta.total_page)} disabled={meta.page === meta.total_page} />
                        </Pagination>
                    </div>
                </Col>
            </Row>

            <ProductModal
                showProductModal={showProductModal}
                setShowProductModal={setShowProductModal}
                editingProduct={editingProduct}
                productImage={productImage}
                handleImageChange={handleImageChange}
                description={description}
                setDescription={setDescription}
                handleAddEditProduct={handleAddEditProduct}
                loading={loading}
                // previewAlbumImages={previewAlbumImages}
            />

            <DeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteProduct={handleDeleteProduct}
            />
        </Container>
    );
};

export default ProductManager;
