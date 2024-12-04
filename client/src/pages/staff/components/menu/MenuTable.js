import React from 'react';
import {Table, Button, ButtonGroup, Dropdown} from 'react-bootstrap';
import moment from "moment/moment";
import {FaEdit, FaListUl, FaTrash} from "react-icons/fa";

const MenuTable = ({ menus, openMenuModal, setMenuToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Ngày tạo</th>
                <th>Tác giả</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {menus.map((menu, index) => (
                <tr key={menu.id}>
                    <td>{index + 1}</td>
                    <td>{menu.name}</td>
                    <td>{menu.description}</td>
                    <td>{moment(menu.createdAt).format('HH:mm DD-MM-YYYY')}</td>
                    <td>{menu.createdBy?.name}</td>
                    <td>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                <FaListUl/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openMenuModal(menu)}>  <FaEdit /> Cập nhật</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setMenuToDelete(menu);
                                    setShowDeleteModal(true);
                                }}> <FaTrash /> Xoá</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default MenuTable;
