import React from 'react';
import {Table, Button, ButtonGroup, Dropdown} from 'react-bootstrap';
import {FaListUl} from "react-icons/fa";
import ServiceRating from "./ServiceRating";

const BoardingTable = ({ boardings, formatCurrency, openBoardingModal, setBoardingToDelete, setShowDeleteModal }) => {
    const handleRateService = async (boardingId, serviceId, rating) => {
        try {
            // Gọi API để cập nhật đánh giá cho dịch vụ
            // await boardingApi.rateService(boardingId, serviceId, rating);
            alert('Thank you for your rating!');
        } catch (error) {
            console.error('Error rating service:', error);
            alert('Failed to submit your rating.');
        }
    };
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Pet Name</th>
                <th>Services</th>
                <th>Days</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {boardings.map((boarding) => (
                <tr key={boarding._id}>
                    <td>{boarding.pet.name}</td>
                    <td>
                        {boarding.services.map((service) => (
                            <div key={service._id} style={{ marginBottom: '10px' }}>
                                <strong>{service.name}</strong>
                                <ServiceRating
                                    type="service"
                                    itemId={service._id}
                                />
                            </div>
                        ))}
                    </td>
                    <td>{boarding.days}</td>
                    <td>{formatCurrency(boarding.totalPrice)}</td>
                    <td>{boarding.status}</td>
                    <td>
                        {/*<Button variant="info" onClick={() => openBoardingModal(boarding)}>Edit</Button>*/}
                        {/*<Button*/}
                        {/*    variant="danger"*/}
                        {/*    onClick={() => {*/}
                        {/*        setBoardingToDelete(boarding);*/}
                        {/*        setShowDeleteModal(true);*/}
                        {/*    }}*/}
                        {/*    className="ms-2"*/}
                        {/*    disabled={boarding.status !== 'pending'} // Disable button if status is not 'pending'*/}
                        {/*>*/}
                        {/*    Delete*/}
                        {/*</Button>*/}
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                <FaListUl />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openBoardingModal(boarding)}>Edit</Dropdown.Item>
                                <Dropdown.Item disabled={boarding.status !== 'pending'} onClick={() => {
                                    setBoardingToDelete(boarding);
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

export default BoardingTable;
