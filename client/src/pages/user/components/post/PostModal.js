import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import postService from '../../../../api/postService';

const PostModal = ({
                       showPostModal,
                       setShowPostModal,
                       editingPost,
                       postImage,
                       defaultImage,
                       handleImageChange,
                       content,
                       setContent,
                       handleAddEditPost,
                       loading
                   }) => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await postService.getListsMenus();
                setMenus(response.data.menus);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };

        fetchMenus();
    }, []);

    return (
        <Modal show={showPostModal} onHide={() => setShowPostModal(false)} dialogClassName="modal-fullscreen">
            <Modal.Header closeButton>
                <Modal.Title>{editingPost ? 'Edit Post' : 'Add New Post'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Row>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Form.Label>Post Image</Form.Label>
                                    <div className="post-image-preview mb-3">
                                        {loading ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            <img
                                                src={postImage || defaultImage}
                                                alt="Post"
                                                className="img-fluid"
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        )}
                                    </div>
                                    <Form.Control type="file" onChange={handleImageChange} />
                                </div>
                            </Col>
                            <Col md={8}>
                                <Formik
                                    initialValues={{
                                        title: editingPost?.title || '',
                                        description: editingPost?.description || '',
                                        menu: editingPost?.menu || '',
                                    }}
                                    validationSchema={Yup.object({
                                        title: Yup.string().required('Required'),
                                        description: Yup.string().required('Required'),
                                        menu: Yup.string().required('Required'),
                                    })}
                                    onSubmit={handleAddEditPost}
                                >
                                    {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Field name="title" className="form-control" />
                                                <ErrorMessage name="title" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Field name="description" className="form-control" as="textarea" rows={3} />
                                                <ErrorMessage name="description" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Menu</Form.Label>
                                                <Field as="select" name="menu" className="form-control">
                                                    <option value="">Chọn menu</option>
                                                    {menus.map(menu => (
                                                        <option key={menu._id} value={menu._id}>
                                                            {menu.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="menu" component="div" className="text-danger" />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Content</Form.Label>
                                                <ReactQuill
                                                    value={content}
                                                    onChange={setContent}
                                                    theme="snow"
                                                />
                                            </Form.Group>

                                            <Button type="submit" variant="success" disabled={isSubmitting}>
                                                {editingPost ? 'Update Post' : 'Add Post'}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default PostModal;
