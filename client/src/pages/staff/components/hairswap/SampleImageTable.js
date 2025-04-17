import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SampleImageTable = ({ sampleImages, openSampleImageModal, setSampleImageToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Tên mẫu ảnh</th>
                    <th>Giới tính</th>
                    <th>Ảnh mẫu</th>
                </tr>
            </thead>
            <tbody>
            {sampleImages.map((image, index) => (
    <tr key={index}>
      <td>{image.name || 'Không có tên'}</td>
      <td>{image.description || 'Không có mô tả'}</td>
      <td>
        {image.avatar && (
          <img src={image.avatar} alt="sample" width="100" />
        )}
      </td>
      <td>
        <Button variant="primary" onClick={() => openSampleImageModal(image)}>
          <FaEdit />
        </Button>{' '}
        <Button variant="danger" onClick={() => {
          setSampleImageToDelete(image);
          setShowDeleteModal(true);
        }}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  ))}
            </tbody>
        </Table>
    );
};

export default SampleImageTable;
