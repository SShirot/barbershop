import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Pagination } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import sampleImageService from '../../api/sampleImageService';
import SampleImageTable from './components/hairswap/SampleImageTable';
import SampleImageFormModal from './components/hairswap/SampleImageFormModal';
import SampleImageDeleteModal from './components/hairswap/SampleImageDeleteModal';

const SampleImageManager = () => {
    const [sampleImages, setSampleImages] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingSampleImage, setEditingSampleImage] = useState(null);
    const [showSampleImageModal, setShowSampleImageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sampleImageToDelete, setSampleImageToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const fetchSampleImagesWithParams = async (params) => {
        try {
            const response = await sampleImageService.getLists(params);
            setSampleImages(response.data.sampleImages);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching sample images:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchSampleImagesWithParams({ ...params, page: params.page || 1 });
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    const handleAddSampleImage = async (values) => {
        try {
            const response = await sampleImageService.create(values);
            setSampleImages([...sampleImages, response.data.sampleImage]);
            setShowSampleImageModal(false);
        } catch (error) {
            console.error("Error adding sample image:", error);
        }
    };

    const handleUpdateSampleImage = async (values) => {
        try {   
            const response = await sampleImageService.update(editingSampleImage.id, values);
            setSampleImages(sampleImages.map(image => 
                image.id === editingSampleImage.id ? response.data.sampleImage : image
            ));
            setEditingSampleImage(null);
        } catch (error) {
            console.error("Error updating sample image:", error);
        }
    };

    const handleDeleteSampleImage = async () => {
        try {
            await sampleImageService.delete(sampleImageToDelete.id);
            setSampleImages(sampleImages.filter(image => image.id !== sampleImageToDelete.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting sample image:", error);
        }
    };

    const openSampleImageModal = (sampleImage = null) => {
        setEditingSampleImage(sampleImage);
        setShowSampleImageModal(true);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Sample Image Manager</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/staff">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/staff/sample-images">Sample Images</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => openSampleImageModal()}>Add Sample Image</Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <SampleImageTable
                        sampleImages={sampleImages}
                        openSampleImageModal={openSampleImageModal}
                        setSampleImageToDelete={setSampleImageToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Pagination>
                        {Array.from({ length: meta.total_pages }, (_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === meta.current_page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>

            <SampleImageFormModal
                showSampleImageModal={showSampleImageModal}
                setShowSampleImageModal={setShowSampleImageModal}
                editingSampleImage={editingSampleImage}
                handleAddSampleImage={handleAddSampleImage}
                handleUpdateSampleImage={handleUpdateSampleImage}
                loading={loading}
            />

            <SampleImageDeleteModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteSampleImage={handleDeleteSampleImage}
            />
        </Container>
    );
};

export default SampleImageManager;
