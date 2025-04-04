import React from 'react';
import {Table, Button, Image, Badge, ButtonGroup, Dropdown} from 'react-bootstrap';
import moment from 'moment';
import { FaEdit, FaTrash, FaEye, FaListUl } from 'react-icons/fa';

const getStatusLabel = (status) => {
    switch (status) {
        case 1:
            return <Badge bg="warning">Chờ xác thực</Badge>; // Màu vàng
        case 2:
            return <Badge bg="success">Đã xác thực</Badge>; // Màu xanh
        case -1:
            return <Badge bg="danger">Đã block</Badge>; // Màu đỏ
        default:
            return <Badge bg="secondary">Không xác định</Badge>; // Màu xám
    }
};

const UserTable = ({ users, openUserModal, setUserToDelete, setShowDeleteModal }) => {
    const defaultImage = "https://via.placeholder.com/150";
    return (
        <Table striped bordered hover responsive className={'customer-table'}>
            <thead>
            <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Role</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>
                        <Image
                            src={user.avatar || defaultImage}
                            alt={user.name}
                            width="60"
                            height="60"
                            roundedCircle
                            className=""
                        />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{getStatusLabel(user.status)}</td>
                    <td>{moment(user.dateOfBirth).format('DD-MM-YYYY')}</td>
                    <td>
                        {user.user_type}
                    </td>
                    <td>
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => openUserModal(user)}
                            title="Cập nhật"
                        >
                            <FaEdit />
                        </Button>
                        <Button
                            size="sm"
                            className="ms-2"
                            variant="danger"
                            onClick={() => {
                                setUserToDelete(user);
                                setShowDeleteModal(true);
                            }}
                            title="Xoá"
                        >
                            <FaTrash />
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default UserTable;
