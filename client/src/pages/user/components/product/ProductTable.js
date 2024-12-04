import React from 'react';
import { Table, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FaListUl } from "react-icons/fa";

const ProductTable = ({ products, defaultImage, openProductModal, setProductToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
                <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                        <img src={product.avatar || defaultImage} alt="Product Avatar"
                             style={{width: '50px', height: '50px'}}/>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category?.name}</td>
                    <td>{product.price.toLocaleString()} VND</td>
                    <td>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                <FaListUl />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openProductModal(product)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setProductToDelete(product);
                                    setShowDeleteModal(true);
                                }}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default ProductTable;
