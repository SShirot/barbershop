import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Pagination, Nav, Breadcrumb
} from 'react-bootstrap';
import {Link, useSearchParams} from "react-router-dom";
import productService from './../../api/productService';
import apiUpload from './../../api/apiUpload';
import ProductTable from './components/product/ProductTable';
import ProductModal from './components/product/ProductModal';
import DeleteConfirmationModal from './components/product/ProductDeleteConfirmationModal';
// import SearchModal from './components/product/ProductSearchModal';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 8 });
    const [editingProduct, setEditingProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
        category: searchParams.get('category') || '',
    });

    const defaultImage = "https://via.placeholder.com/150";

    const fetchProductsWithParams = async (params) => {
        try {
            const response = await productService.getListsProducts(params);
            console.info("===========[] ===========[response] : ",response);
            setProducts(response.data.products);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchProductsWithParams({ ...params, page: params.page || 1 });
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
        setSearchCriteria({ name: '', category: '' });
        setSearchParams({});
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchCriteria, page: newPage });
    };

    const handleAddEditProduct = async (values) => {
        const productData = {
            ...values,
            price: Number(values.price, 10),
            avatar: productImage || defaultImage,
            content: description
        };
        try {
            if (editingProduct) {
                const response = await productService.updateProduct(editingProduct._id, productData);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === editingProduct._id ? response.data.product : product
                    )
                );
            } else {
                const response = await productService.addProduct(productData);
                setProducts((prevProducts) => [...prevProducts, response.data.product]);
            }
            setEditingProduct(null);
            setShowProductModal(false);
            setProductImage(null);
            setDescription('');
        } catch (error) {
            console.error("Error adding/updating product:", error);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            await productService.deleteProduct(productToDelete._id);
            setProducts((prevProducts) => prevProducts?.filter((product) => product._id !== productToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const openProductModal = (product = null) => {
        setEditingProduct(product);
        setShowProductModal(true);
        setProductImage(product?.avatar || null);
        setDescription(product?.content || '');
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const response = await apiUpload.uploadImage(file);
                setProductImage(response.data.fileUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
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
                            <Nav.Link as={Link} to="/user/products">Products</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Manage Products</h2>
                        <div>
                            <Button variant="secondary" className="me-2" onClick={() => setShowSearchModal(true)}>
                                Search
                            </Button>
                            <Button variant="primary" onClick={() => openProductModal(null)}>
                                Add New Product
                            </Button>
                        </div>
                    </div>
                    <ProductTable
                        products={products}
                        defaultImage={defaultImage}
                        openProductModal={openProductModal}
                        setProductToDelete={setProductToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />
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
                </Col>
            </Row>

            <ProductModal
                showProductModal={showProductModal}
                setShowProductModal={setShowProductModal}
                editingProduct={editingProduct}
                productImage={productImage}
                defaultImage={defaultImage}
                handleImageChange={handleImageChange}
                description={description}
                setDescription={setDescription}
                handleAddEditProduct={handleAddEditProduct}
                loading={loading}
            />

            <DeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteProduct={handleDeleteProduct}
            />

            {/*<SearchModal*/}
            {/*    showSearchModal={showSearchModal}*/}
            {/*    setShowSearchModal={setShowSearchModal}*/}
            {/*    searchCriteria={searchCriteria}*/}
            {/*    handleSearch={handleSearch}*/}
            {/*    handleSearchSubmit={handleSearchSubmit}*/}
            {/*/>*/}
        </Container>
    );
};

export default ProductManager;
