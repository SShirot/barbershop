// StatusLabel.js
import React from 'react';
import { Badge } from 'react-bootstrap';

const StatusLabel = ({ status }) => {
    switch (status) {
        case 'published':
            return <Badge bg="success">Published</Badge>;
        case 'pending':
            return <Badge bg="warning">Pending</Badge>;
        case 'draft':
            return <Badge bg="secondary">Draft</Badge>; // 'secondary' cho nhãn 'default'
        default:
            return <Badge bg="light">Unknown</Badge>; // Trường hợp không xác định
    }
};

export default StatusLabel;
