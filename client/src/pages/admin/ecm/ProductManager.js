import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Table,
    Pagination,
    Breadcrumb,
    Nav,
    Image,
    ButtonGroup,
    Dropdown
} from 'react-bootstrap';
import productService from '../../../api/productService';
import {Link, useSearchParams} from "react-router-dom";
import ProductModal from '../components/product/ProductModal';
import DeleteConfirmationModal from '../components/product/ProductDeleteConfirmationModal';
import apiUpload from "../../../api/apiUpload";
import {FaEdit, FaListUl, FaPlusCircle, FaTrash} from "react-icons/fa";

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
    const [searchParams, setSearchParams] = useSearchParams();

    const defaultImage = "https://via.placeholder.com/150";

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
    });

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
    }, []);

    const handleAddEditProduct = async (values) => {
        const productData = {
            ...values,
            price: Number(values.price, 10),
            avatar: productImage || defaultImage,
            content: description,
            categoryId: values.category,
        };
        console.info("===========[] ===========[productData] : ",productData);
        try {
            if (editingProduct) {
                const response = await productService.update(editingProduct.id, productData);
                // setProducts((prevProducts) =>
                //     prevProducts.map((product) =>
                //         product.id === editingProduct.id ? response.data.product : product
                //     )
                // );
            } else {
                const response = await productService.add(productData);
                // setProducts((prevProducts) => [...prevProducts, response.data.product]);
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
        console.info("===========[] ===========[productToDelete] : ",productToDelete);
        try {
            await productService.delete(productToDelete.id);
            const params = Object.fromEntries([...searchParams]);
            fetchProducts({ ...params, page: params.page || 1, page_size: params.page_size || 10 });

            // setProducts((prevProducts) => prevProducts?.filter((product) => product.id !== productToDelete.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const openProductModal = (product = null) => {
        setEditingProduct(product);
        setShowProductModal(true);
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
                        <div>
                            <Button size={'sm'} variant="primary" onClick={() => openProductModal(null)}>
                                Thêm mới <FaPlusCircle className={'mx-1'} />
                            </Button>
                        </div>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Tên sản phẩm</th>
                            <th>Danh mục</th>
                            <th>Giá</th>
                            <th>Nhãn</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <tr key={product?.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image src={product?.avatar || "https://via.placeholder.com/150"} alt="Promotion" rounded style={{width: '50px', height: '50px'}} />
                                </td>
                                <td>{product?.name}</td>
                                <td>{product?.category?.name}</td>
                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</td>
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
                                    <Button size="sm" variant="primary" onClick={() => openProductModal(product)}
                                            title="Cập nhật">
                                        <FaEdit/>
                                    </Button>
                                    <Button size="sm" className={'ms-2'} variant="danger" onClick={() => {
                                        setProductToDelete(product);
                                        setShowDeleteModal(true);
                                    }} title="Xoá">
                                        <FaTrash/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/*<ArticleModal*/}
            {/*    showProductModal={showProductModal}*/}
            {/*    setShowProductModal={setShowProductModal}*/}
            {/*    editingProduct={editingProduct}*/}
            {/*    handleAddEditProduct={handleAddEditProduct}*/}
            {/*/>*/}

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
