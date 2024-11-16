import React from 'react';
import { Table, Dropdown, ButtonGroup, Badge } from 'react-bootstrap';
import {FaEdit, FaListUl, FaStar, FaTrash} from "react-icons/fa";
import {formatCurrencyInput, formatPrice, stripHtmlTags} from "../../../../helpers/formatters";
import moment from "moment";

const ServiceTable = ({ services, openServiceModal, setServiceToDelete, setShowDeleteModal, user }) => {

    return (
        <Table striped bordered hover responsive className="mt-3">
            <thead>
            <tr>
                <th>#</th>
                <th>Tên dịch vụ</th>
                <th>Tại nhà</th>
                <th>Giá</th>
                <th>Mô tả</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {services.map((service,index) => (
                <tr key={service.id}>
                    <td>{index + 1}</td>
                    <td>{service.name}</td>
                    <td>{service.is_home_service ? "Tại nhà" : "Tại cửa hàng" }</td>
                    <td>{new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(service?.price)}</td>
                    <td>{service.description.replace(/<[^>]+>/g, '')}</td>
                    <td>{moment(service.createdAt).format('HH:mm DD-MM-YYYY')}</td>
                    <td>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                <FaListUl/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openServiceModal(service)}>  <FaEdit /> Cập nhật</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setServiceToDelete(service);
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

export default ServiceTable;
