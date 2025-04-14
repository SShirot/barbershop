import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SampleImageTable = ({ sampleImages, openSampleImageModal, setSampleImageToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Tên mẫu ảnh</th>
                    <th>Mô tả</th>
                    <th>Ảnh mẫu</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {sampleImages.map((image) => (
                    <tr key={image.id}>
                        <td>{image.name}</td>
                        <td>{image.description}</td>
                        
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default SampleImageTable;
