import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Pagination } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TagTable from "../components/tag/TagTable";
import TagSearchModal from "../components/tag/TagSearchModal";
import TagFormModal from "../components/tag/TagFormModal";
import tagService from "../../../api/tagService";
import {FaPlusCircle} from "react-icons/fa";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";

const MenuManager = () => {
    const [tags, setTags] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingMenu, setEditingMenu] = useState(null);
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const [showSearchModal, setShowSearchModal] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
    });

    const fetchTagsWithParams = async (params) => {
        try {
            const response = await tagService.getLists(params);
            setTags(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching menus:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchTagsWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
    }, [searchParams]);

    const handleSearch = (value, key) => {
        setSearchCriteria((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchSubmit = () => {
        const newParams = { ...searchCriteria, page: 1, page_size: 10 };
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

    const handleAddEditMenu = async (values) => {
        try {
			values = {
				...values,
				status: values?.status || 'pending',
				is_featured: values?.is_featured || 1
			}
            if (editingMenu) {
                const response = await tagService.update(editingMenu.id, values);
            } else {
                const response = await tagService.add(values);
            }
            const params = Object.fromEntries([...searchParams]);
            fetchTagsWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
            setEditingMenu(null);
            setShowMenuModal(false);
        } catch (error) {
            console.error("Error adding/updating menu:", error);
        }
    };

    const handleDeleteData = async () => {
        try {
            await tagService.delete(menuToDelete.id);
            const params = Object.fromEntries([...searchParams]);
            await fetchTagsWithParams({...params, page: params.page || 1, page_size: params.page_size || 10});
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting menu:", error);
        }
    };

    const openMenuModal = (menu = null) => {
        setEditingMenu(menu);
        setShowMenuModal(true);
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
                            <Nav.Link as={Link} to="/admin/news/tag">Tags</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý từ khoá</h2>
                        <div>
                            {/*<Button variant="secondary" className="me-2" onClick={() => setShowSearchModal(true)}>*/}
                            {/*    Tìm kiếm*/}
                            {/*</Button>*/}
                            <Button size={'sm'} variant="primary" onClick={() => openMenuModal(null)}>
                                Thêm mới <FaPlusCircle className={'mx-1'} />
                            </Button>
                        </div>
                    </div>

                    <TagTable
                        tags={tags}
                        openMenuModal={openMenuModal}
                        setMenuToDelete={setMenuToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />

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

            <TagFormModal
                showMenuModal={showMenuModal}
                setShowMenuModal={setShowMenuModal}
                editingMenu={editingMenu}
                handleAddEditMenu={handleAddEditMenu}
            />

            <ModelConfirmDeleteData
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteData={handleDeleteData}
            />

            <TagSearchModal
                showSearchModal={showSearchModal}
                setShowSearchModal={setShowSearchModal}
                searchCriteria={searchCriteria}
                handleSearch={handleSearch}
                handleResetSearch={handleResetSearch}
                handleSearchSubmit={handleSearchSubmit}
            />
        </Container>
    );
};

export default MenuManager;
