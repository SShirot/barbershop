import React from 'react';
import {Table, Button, ButtonGroup, Dropdown, Image} from 'react-bootstrap';
import {FaListUl} from "react-icons/fa";
import StatusLabel from "../../../../helpers/StatusLabel";
import moment from "moment/moment";
import {Link} from "react-router-dom";

const SlideTable = ({ slides, openCategoryModal, setCategoryToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Hình ảnh</th>
                <th>Tiêu đề</th>
                <th>Link</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {slides.map((item, index) => (
                <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td>
                        <Image src={item?.avatar} thumbnail width={'100px'} />
                    </td>
                    <td>{item?.name}</td>
                    <td>
                        <Link to={item?.link}>Click tại đây</Link>
                    </td>
                    <td><StatusLabel status={item?.status} /></td>
                    <td>{moment(item?.created_at).format('DD-MM-YYYY')}</td>
                    <td>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id={`dropdown-basic-${item?.id}`}>
                                <FaListUl/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openCategoryModal(item)}>Cập nhật</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setCategoryToDelete(item); setShowDeleteModal(true);
                                }}>Xoá</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default SlideTable;
