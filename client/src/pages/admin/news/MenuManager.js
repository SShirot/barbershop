import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Pagination } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import menuService from '../../../api/menuService';
import MenuTable from '../components/menu/MenuTable';
import MenuFormModal from '../components/menu/MenuFormModal';
import MenuDeleteModal from '../components/menu/MenuDeleteModal';
import MenuSearchModal from '../components/menu/MenuSearchModal';
import {FaPlusCircle} from "react-icons/fa";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import {createSlug} from "../../../helpers/formatters";

const MenuManager = () => {
    const [menus, setMenus] = useState([]);
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

    const fetchMenusWithParams = async (params) => {
        try {
            const response = await menuService.getLists(params);
            setMenus(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching menus:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchMenusWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
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

        const dataModel = {
            ...values,
            slug : createSlug(values.name)
        };
        try {
            if (editingMenu) {
                const response = await menuService.update(editingMenu.id, dataModel);
            } else {
                const response = await menuService.add(dataModel);
            }
            const params = Object.fromEntries([...searchParams]);
            fetchMenusWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
            setEditingMenu(null);
            setShowMenuModal(false);
        } catch (error) {
            console.error("Error adding/updating menu:", error);
        }
    };

    const handleDeleteData = async () => {
        try {
            await menuService.delete(menuToDelete.id);
            setShowDeleteModal(false);
            const params = Object.fromEntries([...searchParams]);
            fetchMenusWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
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
                            <Nav.Link as={Link} to="/admin/menus">Menus</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý chuyên mục</h2>
                        <div>
                            {/*<Button variant="secondary" className="me-2" onClick={() => setShowSearchModal(true)}>*/}
                            {/*    Tìm kiếm*/}
                            {/*</Button>*/}
                            <Button size={'sm'} variant="primary" onClick={() => openMenuModal(null)}>
                                Thêm mới <FaPlusCircle className={'mx-1'} />
                            </Button>
                        </div>
                    </div>

                    <MenuTable
                        menus={menus}
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

            <MenuFormModal
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

            <MenuSearchModal
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
