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
                <th>Description</th>
                <th>Status</th>
                <th>createdAt</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {productLabels.map((category, index) => (
                <tr key={category?.id}>
                    <td>{index + 1}</td>
                    <td>{category?.name}</td>
                    <td>{category?.description}</td>
                    <td><StatusLabel status={category?.status}/></td>
                    <td>{moment(category?.created_at).format('DD-MM-YYYY')}</td>
                    <td>
                        <Button size="sm" variant="primary" onClick={() => openCategoryModal(category)}
                                title="Cập nhật">
                            <FaEdit/>
                        </Button>
                        <Button size="sm" className={'ms-2'} variant="danger" onClick={() => {
                            setCategoryToDelete(category);
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
