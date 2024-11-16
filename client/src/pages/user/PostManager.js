import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Pagination, Nav, Breadcrumb
} from 'react-bootstrap';
import {Link, useSearchParams} from "react-router-dom";
import postService from './../../api/postService';
import PostTable from './components/post/PostTable';
import PostModal from './components/post/PostModal';
import DeleteConfirmationModal from './components/post/PostDeleteConfirmationModal';
import SearchModal from './components/post/PostSearchModal';

const PostManager = () => {
    const [posts, setPosts] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingPost, setEditingPost] = useState(null);
    const [showPostModal, setShowPostModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [postImage, setPostImage] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        title: searchParams.get('title') || '',
    });

    const defaultImage = "https://via.placeholder.com/150";

    const fetchPostsWithParams = async (params) => {
        try {
            const response = await postService.getLists(params);
            setPosts(response.data.posts);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchPostsWithParams({ ...params, page: params.page || 1 });
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
        setSearchCriteria({ title: '' });
        setSearchParams({});
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchCriteria, page: newPage });
    };

    const handleAddEditPost = async (values) => {
        const postData = {
            ...values,
            avatar: postImage || defaultImage,
            content
        };
        try {
            if (editingPost) {
                const response = await postService.update(editingPost._id, postData);
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === editingPost._id ? response.data.post : post
                    )
                );
            } else {
                const response = await postService.add(postData);
                setPosts((prevPosts) => [...prevPosts, response.data.post]);
            }
            setEditingPost(null);
            setShowPostModal(false);
            setPostImage(null);
            setContent('');
        } catch (error) {
            console.error("Error adding/updating post:", error);
        }
    };

    const handleDeletePost = async () => {
        try {
            await postService.delete(postToDelete._id);
            setPosts((prevPosts) => prevPosts?.filter((post) => post._id !== postToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const openPostModal = (post = null) => {
        setEditingPost(post);
        setShowPostModal(true);
        setPostImage(post?.avatar || null);
        setContent(post?.content || '');
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const response = await postService.uploadPostImage(file);
                setPostImage(response.data.fileUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container>
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <Breadcrumb>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/user/posts">Posts</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Manage Posts</h2>
                        <div>
                            <Button variant="secondary" className="me-2" onClick={() => setShowSearchModal(true)}>
                                Search
                            </Button>
                            <Button variant="primary" onClick={() => openPostModal(null)}>
                                Add New Post
                            </Button>
                        </div>
                    </div>
                    <PostTable
                        posts={posts}
                        defaultImage={defaultImage}
                        openPostModal={openPostModal}
                        setPostToDelete={setPostToDelete}
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

            <PostModal
                showPostModal={showPostModal}
                setShowPostModal={setShowPostModal}
                editingPost={editingPost}
                postImage={postImage}
                defaultImage={defaultImage}
                handleImageChange={handleImageChange}
                content={content}
                setContent={setContent}
                handleAddEditPost={handleAddEditPost}
                loading={loading}
            />

            <DeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeletePost={handleDeletePost}
            />

            <SearchModal
                showSearchModal={showSearchModal}
                setShowSearchModal={setShowSearchModal}
                searchCriteria={searchCriteria}
                handleSearch={handleSearch}
                handleSearchSubmit={handleSearchSubmit}
                handleResetSearch={handleResetSearch}
            />
        </Container>
    );
};

export default PostManager;
