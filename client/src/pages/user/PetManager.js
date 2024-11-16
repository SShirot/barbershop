import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Pagination
} from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import petService from './../../api/petService';
import Breadcrumbs from './components/pet/PetBreadcrumbs';
import PetTable from './components/pet/PetLists';
import PetModal from './components/pet/PetModal';
import DeleteConfirmationModal from './components/pet/PetDeleteConfirmationModal';
import SearchModal from './components/pet/PetSearchModal';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const PetManager = () => {
    const [pets, setPets] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingPet, setEditingPet] = useState(null);
    const [showPetModal, setShowPetModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const [petImage, setPetImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
        gender: searchParams.get('gender') || '',
    });

    const defaultImage = "https://via.placeholder.com/150";

    const fetchPetsWithParams = async (params) => {
        try {
            const response = await petService.getPets(params);
            setPets(response.data.pets);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchPetsWithParams({ ...params, page: params.page || 1 });
    }, [searchParams]);

    const handleSearch = (value, key) => {
        setSearchCriteria((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchSubmit = () => {
        const newParams = { ...searchCriteria, page: 1 };
        setSearchParams(newParams);
        setShowSearchModal(false);
    };

    const handleResetSearch = () => {
        setSearchCriteria({ name: '', gender: '' });
        setSearchParams({});
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchCriteria, page: newPage });
    };

    const handleAddEditPet = async (values) => {
        const petData = {
            ...values,
            price: Number(values.price, 10),
            avatar: petImage || defaultImage,
            description
        };
        try {
            if (editingPet) {
                const response = await petService.updatePet(editingPet._id, petData);
                setPets((prevPets) =>
                    prevPets.map((pet) =>
                        pet._id === editingPet._id ? response.data.pet : pet
                    )
                );
            } else {
                const response = await petService.addPet(petData);
                setPets((prevPets) => [...prevPets, response.data.pet]);
            }
            setEditingPet(null);
            setShowPetModal(false);
            setPetImage(null);
            setDescription('');
        } catch (error) {
            console.error("Error adding/updating pet:", error);
        }
    };

    const handleDeletePet = async () => {
        try {
            await petService.deletePet(petToDelete._id);
            setPets((prevPets) => prevPets?.filter((pet) => pet._id !== petToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };

    const openPetModal = (pet = null) => {
        setEditingPet(pet);
        setShowPetModal(true);
        setPetImage(pet?.avatar || null);
        setDescription(pet?.description || '');
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const response = await petService.uploadPetImage(file);
                setPetImage(response.data.fileUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const formatCurrencyInput = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <>
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <Breadcrumbs />
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between">
                        <h2>Manage Pets</h2>
                        <div>
                            <Button variant="secondary" className="me-2" onClick={() => setShowSearchModal(true)}>
                                Search
                            </Button>
                            <Button variant="primary" onClick={() => openPetModal(null)}>
                                Add New Pet
                            </Button>
                        </div>
                    </div>
                    <PetTable
                        pets={pets}
                        defaultImage={defaultImage}
                        formatCurrency={formatCurrency}
                        openPetModal={openPetModal}
                        setPetToDelete={setPetToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={meta.page === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(meta.page - 1)}
                            disabled={meta.page === 1}
                        />
                        {Array.from({ length: meta.total_page }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === meta.page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(meta.page + 1)}
                            disabled={meta.page === meta.total_page}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(meta.total_page)}
                            disabled={meta.page === meta.total_page}
                        />
                    </Pagination>
                </Col>
            </Row>

            <PetModal
                showPetModal={showPetModal}
                setShowPetModal={setShowPetModal}
                editingPet={editingPet}
                petImage={petImage}
                defaultImage={defaultImage}
                handleImageChange={handleImageChange}
                description={description}
                setDescription={setDescription}
                handleAddEditPet={handleAddEditPet}
                formatCurrencyInput={formatCurrencyInput}
                loading={loading}
            />

            <DeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeletePet={handleDeletePet}
            />

            <SearchModal
                showSearchModal={showSearchModal}
                setShowSearchModal={setShowSearchModal}
                searchCriteria={searchCriteria}
                handleSearch={handleSearch}
                handleSearchSubmit={handleSearchSubmit}
                handleResetSearch={handleResetSearch}
            />
        </>
    );
};

export default PetManager;
