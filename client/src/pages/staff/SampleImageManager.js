import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Pagination } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import sampleImageService from '../../api/sampleImageService';
import SampleImageTable from './components/hairswap/SampleImageTable';
import SampleImageFormModal from './components/hairswap/SampleImageFormModal';
import SampleImageDeleteModal from './components/hairswap/SampleImageDeleteModal';
import {FaPlusCircle} from "react-icons/fa";

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
            const response = await sampleImageService.getList(params);
            setSampleImages(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching sample images:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchSampleImagesWithParams({ ...params, page: params.page || 1, page_size: params.page_size || 10 });
    }, [searchParams]);
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };
    const handleAddSampleImage = async (hairData) => {
        try {
            const response = await sampleImageService.add(hairData);
            const newImage = response.data.data || response.data.sampleImage || response.data;
            setSampleImages([...sampleImages, newImage]);
            setShowSampleImageModal(false);
        } catch (error) {
            console.error("Error adding sample image:", error);
        }
    };

    const handleUpdateSampleImage = async (values) => {
        try {
            let imageUrl = values.image;
            // Nếu là file mới (user vừa chọn)
            if (values.image instanceof File) {
                const uploadRes = await import('../../api/apiUpload').then(m => m.default.uploadImage(values.image));
                imageUrl = uploadRes.data.imageUrl;
            }
            const hairData = {
                ...values,
                avatar: imageUrl,
            };
            const response = await sampleImageService.update(editingSampleImage.id, hairData);
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
                    <Breadcrumb>
                        <Breadcrumb.Item href="/staff">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/staff/hairswap/manage">Sample Images</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Quản lý mẫu tóc</h2>
                <div>
                    <Button variant="primary" size={'sm'} onClick={() => openSampleImageModal(null)}>
                                    Thêm mới <FaPlusCircle className={'mx-1'} />
                    </Button>
                </div>
            </div>

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
