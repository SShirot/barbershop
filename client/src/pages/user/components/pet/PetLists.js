import React from 'react';
import {Table, Dropdown, ButtonGroup, Image, Button} from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const PetTable = ({ pets, defaultImage, formatCurrency, openPetModal, setPetToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover responsive className="mt-3">
            <thead>
            <tr>
                <th style={{ textAlign: 'center', width: '100px' }}>Image</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Type</th>
                <th>Price</th>
                <th style={{ textAlign: 'center', width: '200px' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {pets.map((pet) => (
                <tr key={pet._id}>
                    <td style={{ textAlign: 'center' }}>
                        <Image
                            src={pet.avatar || defaultImage}
                            alt={pet.name}
                            width="60"
                            height="60"
                            roundedCircle
                            className=""
                        />
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>{pet.name}</td>
                    <td style={{ verticalAlign: 'middle' }}>{pet.gender}</td>
                    <td style={{ verticalAlign: 'middle' }}>{pet.age}</td>
                    <td style={{ verticalAlign: 'middle' }}>{pet.type}</td>
                    <td style={{ verticalAlign: 'middle' }}>{formatCurrency(pet.price || 0)}</td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <Button onClick={() => openPetModal(pet)} className={'btn btn-sm btn-primary'}>
                            <FaEdit className="" /> Edit
                        </Button>
                        <Button onClick={() => {
                            setPetToDelete(pet);
                            setShowDeleteModal(true);
                        }} className={'btn btn-sm btn-danger ms-2'}>
                            <FaTrashAlt className="" /> Delete
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default PetTable;
