import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const OrderDetailsModal = ({ show, onHide, order }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Customer: {order?.guestInfo?.name}</h5>
                <h5>Phone: {order?.guestInfo?.phone}</h5>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order?.transactions?.map((transaction, idx) => (
                        <tr key={transaction._id}>
                            <td>{idx + 1}</td>
                            <td>{transaction.product?.name}</td>
                            <td>{transaction.quantity}</td>
                            <td>{formatCurrency(transaction.price)}</td>
                            <td>{formatCurrency(transaction.price * transaction.quantity)}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderDetailsModal;
