import React from 'react';
import {Table, Button, ButtonGroup, Dropdown} from 'react-bootstrap';
import {FaListUl} from "react-icons/fa";

const PostTable = ({ posts, defaultImage, openPostModal, setPostToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Title</th>
                <th>Description</th>
                <th>Menu</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {posts.map((post, index) => (
                <tr key={post._id}>
                    <td>{index + 1}</td>
                    <td>
                        <img src={post.avatar || defaultImage} alt="Post Avatar"
                             style={{width: '50px', height: '50px'}}/>
                    </td>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{post.menu?.name}</td>
                    <td>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                <FaListUl />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openPostModal(post)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setPostToDelete(post);
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

export default PostTable;
