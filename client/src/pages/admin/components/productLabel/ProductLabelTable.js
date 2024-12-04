import React from 'react';
import {Table, Button, ButtonGroup, Dropdown} from 'react-bootstrap';
import {FaEdit, FaListUl, FaTrash} from "react-icons/fa";
import StatusLabel from "../../../../helpers/StatusLabel";
import moment from "moment/moment";

const ProductLabelTable = ({productLabels, openCategoryModal, setCategoryToDelete, setShowDeleteModal}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Status</th>
                <th>createdAt</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {productLabels.map((item, index) => (
                <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.slug}</td>
                    <td>{item?.description}</td>
                    <td><StatusLabel status={item?.status}/></td>
                    <td>{moment(item?.created_at).format('DD-MM-YYYY')}</td>
                    <td>
                        <Button size="sm" variant="primary" onClick={() => openCategoryModal(item)}
                                title="Cập nhật">
                            <FaEdit/>
                        </Button>
                        <Button size="sm" className={'ms-2'} variant="danger" onClick={() => {
                            setCategoryToDelete(item);
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

export default ProductLabelTable;
