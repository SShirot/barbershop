import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import apiOrderService from "./../../../../api/apiOrderService";

const UpdateOrderStatus = ({ orderId, currentStatus }) => {
    const [status, setStatus] = useState(currentStatus);

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await apiOrderService.updateOrderStatus(orderId, { status: newStatus });
            setStatus(newStatus);
            alert('Order status updated successfully');
        } catch (error) {
            console.error("Error updating order status:", error);
            alert('Failed to update order status');
        }
    };

    // Xác định màu sắc của nút dựa trên trạng thái hiện tại
    const getVariant = () => {
        switch (status) {
            case 'pending':
                return 'primary';
            case 'completed':
                return 'success';
            case 'canceled':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    return (
        <DropdownButton size="sm" id="dropdown-basic-button" variant={getVariant()} title={status}>
            <Dropdown.Item onClick={() => handleStatusChange('pending')}>Pending</Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusChange('completed')}>Completed</Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusChange('canceled')}>Canceled</Dropdown.Item>
        </DropdownButton>
    );
};

export default UpdateOrderStatus;
