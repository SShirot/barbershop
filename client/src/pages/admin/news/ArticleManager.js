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
    Dropdown, Badge
} from 'react-bootstrap';

import {Link, useSearchParams} from "react-router-dom";
import apiUpload from "../../../api/apiUpload";
import ArticleModal from "../components/article/ArticleModal";
import articleService from "../../../api/articleService";
import {FaEdit, FaListUl, FaPlusCircle, FaTrash} from "react-icons/fa";
import moment from "moment";
import StatusLabel from "../../../helpers/StatusLabel";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import {createSlug} from "../../../helpers/formatters";

const ArticleManager = () => {
    const [articles, setArticles] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [selectedTags, setSelectedTags] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [contentArticle, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const defaultImage = "https://via.placeholder.com/150";
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchArticles = async (params) => {
        try {
            const response = await articleService.getLists(params);
            setArticles(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchArticles({ ...params, page: params.page || 1, page_size: params.page_size || 10 }).then(r => {});
    }, [searchParams]);

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
        // page: searchParams.get('page') || 1,
        // page_size: searchParams.get('page_size') || 10,
    });

    const handleAddEditProduct = async (values) => {
        const tagIds = selectedTags.map(tag => tag.value);
        const dataModel = {
            ...values,
            avatar: imageData || defaultImage,
            content: contentArticle,
            tags: tagIds,
            slug : createSlug(values.name)
        };
        console.info("===========[] ===========[dataModel] : ",dataModel);

        try {
            if (editingProduct) {
                const response = await articleService.update(editingProduct.id, dataModel);
                setArticles((prevData) =>
                    prevData.map((item) =>
                        item.id === editingProduct.id ? response.data.data : item
                    )
                );
            } else {
                const response = await articleService.add(dataModel);
                setArticles((prevData) => [...prevData, response.data.data]);
            }
            setEditingProduct(null);
            setShowProductModal(false);
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
                setImageData(response.data);
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteData = async () => {
        try {
            await articleService.delete(productToDelete.id);
            setArticles((prevProducts) => prevProducts?.filter((product) => product.id !== productToDelete.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const openProductModal = (dataEdit = null) => {
        setEditingProduct(dataEdit);
        setShowProductModal(true);
        if(dataEdit && dataEdit.avatar) setImageData(dataEdit.avatar);
        if(dataEdit && dataEdit.content) setContent(dataEdit.content);


        if (dataEdit && dataEdit.tags) {
            // Đặt selectedTags khi mở modal trong chế độ chỉnh sửa
            setSelectedTags(dataEdit.tags.map(tag => ({ value: tag.id, label: tag.name })));
        } else {
            setSelectedTags([]);
        }
    };

    const handleResetSearch = () => {
        setSearchCriteria({ name: '' });
        setSearchParams({});
    };

    const handlePageChange = (newPage) => {
        console.info("===========[] ===========[1111] : ");
        setSearchParams({ ...searchCriteria, page: newPage });
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
                            <Nav.Link as={Link} to="/admin/news/articles">Bài viết</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý bài viết</h2>
                        <div>
                            <Button size={'sm'} variant="primary" onClick={() => openProductModal(null)}>
                                Thêm mới <FaPlusCircle className={'mx-1'} />
                            </Button>
                        </div>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th className={'text-center'}>#</th>
                            <th style={{ width : "60px"}}>Hình ảnh</th>
                            <th style={{ width : "30%"}}>Tên bài viết</th>
                            <th>Chuyên mục</th>
                            <th>Từ khoá</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {articles.map((article, index) => (
                            <tr key={article.id}>
                                <td className={'text-center'} >{index + 1}</td>
                                <td>
                                    <Image src={article.avatar || "https://via.placeholder.com/150"} alt="Promotion"
                                           rounded style={{width: '50px', height: '50px'}}/>
                                </td>
                                <td>{article.name}</td>
                                <td>{article.menu?.name}</td>
                                <td>
                                    {article.tags.map(tag => (
                                        <Badge key={tag.id} bg="secondary" className="me-1">
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </td>
                                <td>
                                    <StatusLabel status={article.status} />
                                </td>
                                <td>{moment(article.created_at).format('DD-MM-YYYY')}</td>
                                <td>
                                    <Button size="sm" variant="primary" onClick={() => openProductModal(article)}
                                            title="Cập nhật">
                                        <FaEdit/>
                                    </Button>
                                    <Button size="sm" className={'ms-2'} variant="danger" onClick={() => {
                                        setProductToDelete(article);
                                        setShowDeleteModal(true);
                                    }} title="Xoá">
                                        <FaTrash/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={meta.page === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(meta.page - 1)} disabled={meta.page === 1} />
                        {Array.from({ length: meta.total_page }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === meta.page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(meta.page + 1)} disabled={meta.page === meta.total_page} />
                        <Pagination.Last onClick={() => handlePageChange(meta.total_page)} disabled={meta.page === meta.total_page} />
                    </Pagination>
                </Col>
            </Row>

            <ArticleModal
                showProductModal={showProductModal}
                setShowProductModal={setShowProductModal}
                editingProduct={editingProduct}
                imageData={imageData}
                defaultImage={defaultImage}
                handleImageChange={handleImageChange}
                content={contentArticle}
                setContent={setContent}
                handleAddEditProduct={handleAddEditProduct}
                loading={loading}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />

            <ModelConfirmDeleteData
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteData={handleDeleteData}
            />
        </Container>
    );
};

export default ArticleManager;
