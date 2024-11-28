import React from 'react';
import {Table, Dropdown, ButtonGroup, Badge, Button} from 'react-bootstrap';
import {FaEdit, FaListUl, FaStar, FaTrash} from "react-icons/fa";
import {formatCurrencyInput, formatPrice, stripHtmlTags} from "../../../../helpers/formatters";
import moment from "moment";

const ServiceUserTable = ({ services, openServiceModal, setServiceToDelete, setShowDeleteModal, user }) => {

    return (
        <Table striped bordered hover responsive className="mt-3">
            <thead>
            <tr>
                <th>#</th>
                <th>Khách hàng</th>
                <th>Tên dịch vụ</th>
                <th>Nhân viên</th>
                <th>Tại nhà</th>
                <th>Giá</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {services.map((service,index) => (
                <tr key={service.id}>
                    <td>{index + 1}</td>
                    <td>{service.user_name}</td>
                    <td>{service.name}</td>
                    <td>{service.adm_name ?? "Chưa chọn"}</td>
                    <td>{service.is_home_service ? "Tại nhà" : "Tại cửa hàng" }</td>
                    <td>{new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(service?.price)}</td>
                    <td>{moment(service.createdAt).format('HH:mm DD-MM-YYYY')}</td>
                    <td>
                        <Button size="sm" className={'ms-2'} variant="danger" onClick={() => {
                            setServiceToDelete(service);
                            setShowDeleteModal(true);
                        }} title="Xoá">
                            <FaTrash/>
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default ServiceUserTable;
