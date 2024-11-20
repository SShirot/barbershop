import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button, Breadcrumb, Nav, Pagination} from 'react-bootstrap';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import userService from '../../../api/userService';
import UserTable from '../components/user/UserTable';
import UserFormModal from '../components/user/UserFormModal';
import UserSearchModal from '../components/user/UserSearchModal';
import {FaPlusCircle} from "react-icons/fa";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState({total: 0, total_page: 1, page: 1, page_size: 10});
    const [editingUser, setEditingUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showSearchModal, setShowSearchModal] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
        email: searchParams.get('email') || '',
        role: searchParams.get('role') || '',
    });

    const fetchUsersWithParams = async (params) => {
        try {
            const response = await userService.getLists(params);
            setUsers(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchUsersWithParams({...params, page: params.page || 1, page_size: params.page_size || 10});
    }, [searchParams]);

    const handleSearch = (value, key) => {
        setSearchCriteria((prev) => ({...prev, [key]: value}));
    };

    const handleSearchSubmit = () => {
        const newParams = {...searchCriteria, page: 1};
        setSearchParams(newParams);
        setShowSearchModal(false);
    };

    const handleResetSearch = () => {
        setSearchCriteria({username: '', email: '', role: ''});
        setSearchParams({});
    };

    const handlePageChange = (newPage) => {
        setSearchParams({...searchCriteria, page: newPage});
    };

    const handleAddEditUser = async (values) => {
        console.log("user-------> ", values);
		try {
            if (editingUser) {
                const response = await userService.update(editingUser.id, values);
            } else {
                const modelData = {
                    ...values,
                    avatar: "https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg"
                };
                const response = await userService.add(modelData);
            }
            const params = Object.fromEntries([...searchParams]);
            await fetchUsersWithParams({...params, page: params.page || 1, page_size: params.page_size || 10});
            setEditingUser(null);
            setShowUserModal(false);
        } catch (error) {
            console.error("Error adding/updating user:", error);
        }
    };

    const handleDeleteData = async () => {
        try {
            await userService.delete(userToDelete.id);
            const params = Object.fromEntries([...searchParams]);
            fetchUsersWithParams({...params, page: params.page || 1, page_size: params.page_size || 10});
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const openUserModal = (user = null) => {
        setEditingUser(user);
        setShowUserModal(true);
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
                            <Nav.Link as={Link} to="/admin/users">Tài khoản</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý tài khoản</h2>
                        <div>
                            {/*<Button variant="secondary" className="me-2" onClick={() => setShowSearchModal(true)}>*/}
                            {/*    Tìm kiếm*/}
                            {/*</Button>*/}
                            <Button variant="primary" size={"sm"} onClick={() => openUserModal(null)}>
                                Thêm mới <FaPlusCircle className={'mx-1'}/>
                            </Button>

                        </div>
                    </div>

                    <UserTable
                        users={users}
                        openUserModal={openUserModal}
                        setUserToDelete={setUserToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />

                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={meta.page === 1}/>
                        <Pagination.Prev onClick={() => handlePageChange(meta.page - 1)} disabled={meta.page === 1}/>
                        {Array.from({length: meta.total_page}, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === meta.page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(meta.page + 1)}
                                         disabled={meta.page === meta.total_page}/>
                        <Pagination.Last onClick={() => handlePageChange(meta.total_page)}
                                         disabled={meta.page === meta.total_page}/>
                    </Pagination>
                </Col>
            </Row>

            <UserFormModal
                showUserModal={showUserModal}
                setShowUserModal={setShowUserModal}
                editingUser={editingUser}
                handleAddEditUser={handleAddEditUser}
            />

            <ModelConfirmDeleteData
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteData={handleDeleteData}
            />

            <UserSearchModal
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

export default UserManager;
