import React from 'react';
import {Table, Button, ButtonGroup, Dropdown} from 'react-bootstrap';
import {FaEdit, FaListUl, FaTrash} from "react-icons/fa";
import StatusLabel from "../../../../helpers/StatusLabel";
import moment from "moment/moment";

const AttributeTable = ({ attributes, openCategoryModal, setCategoryToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover responsive="md" className="text-center align-middle">
            <thead className="table-light">
            <tr>
                <th>#</th>
                <th className="text-start">Tên danh mục</th>
                <th className="text-start">Đường dẫn</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {attributes.map((item, index) => (
                <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td className="text-start">{item?.name}</td>
                    <td className="text-start">{item?.slug}</td>
                    <td><StatusLabel status={item?.status} /></td>
                    <td>{moment(item?.created_at).format('DD-MM-YYYY')}</td>
                    <td>
                        <Button size="sm" variant="primary" onClick={() => openCategoryModal(item)} title="Cập nhật">
                            <FaEdit />
                        </Button>
                        <Button size="sm" className={'ms-2'} variant="danger" onClick={() => {
                            setCategoryToDelete(item);
                            setShowDeleteModal(true);
                        }} title="Xoá">
                            <FaTrash />
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default AttributeTable;
