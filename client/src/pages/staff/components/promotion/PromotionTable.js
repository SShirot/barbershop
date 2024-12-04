import React from 'react';
import {Table, Dropdown, ButtonGroup, Badge, Image} from 'react-bootstrap';
import { FaListUl } from "react-icons/fa";

const PromotionTable = ({ promotions, openPromotionModal, setPromotionToDelete, setShowDeleteModal }) => {
    const formatDiscount = (promotion) => {
        return promotion.discountType === 'percent' ? `${promotion.discountValue}%` : `${promotion.discountValue} VND`;
    };

    const defaultImage = "https://via.placeholder.com/150";

    return (
        <Table striped bordered hover responsive className="mt-3">
            <thead>
            <tr>
                <th>Image</th>
                <th>Code</th>
                <th>Discount</th>
                <th>Validity</th>
                <th>Usage Limit</th>
                <th>Status</th>
                <th style={{ textAlign: 'center', width: '200px' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {promotions.map((promotion) => (
                <tr key={promotion._id}>
                    <td style={{textAlign: 'center'}}>
                        <Image
                            src={promotion.programImage || defaultImage}
                            alt={promotion.name}
                            width="60"
                            height="60"
                            roundedCircle
                            className=""
                        />
                    </td>
                    <td style={{verticalAlign: 'middle'}}>{promotion.code}</td>
                    <td style={{verticalAlign: 'middle'}}>{formatDiscount(promotion)}</td>
                    <td style={{verticalAlign: 'middle'}}>
                        {promotion.isUnlimited
                            ? 'Unlimited'
                            : `${promotion.startDate} - ${promotion.endDate}`}
                    </td>
                    <td style={{verticalAlign: 'middle'}}>{promotion.usageLimit || 'Unlimited'}</td>
                    <td style={{verticalAlign: 'middle'}}>
                            <span className={`badge ${promotion.isActive ? 'bg-success' : 'bg-danger'}`}>
                                {promotion.isActive ? 'Active' : 'Inactive'}
                            </span>
                    </td>
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                <FaListUl/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openPromotionModal(promotion)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setPromotionToDelete(promotion);
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

export default PromotionTable;
