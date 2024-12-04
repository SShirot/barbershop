import React from 'react';
import {Table, Button, ButtonGroup, Dropdown} from 'react-bootstrap';
import {FaEdit, FaListUl, FaRegStar, FaStar, FaStarHalfAlt, FaTrash} from "react-icons/fa";
import StatusLabel from "../../../../helpers/StatusLabel";
import moment from "moment/moment";

const VoteTable = ({ votes, openCategoryModal, setCategoryToDelete, setShowDeleteModal }) => {
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<FaStar key={i} style={{ color: 'orange' }} />); // Ngôi sao đầy
            } else if (i - rating < 1) {
                stars.push(<FaStarHalfAlt key={i} style={{ color: 'orange' }} />); // Ngôi sao nửa
            } else {
                stars.push(<FaRegStar key={i} style={{ color: 'orange' }} />); // Ngôi sao rỗng
            }
        }
        return stars;
    };
    return (
        <Table striped bordered hover responsive="md" className="text-center align-middle">
            <thead className="table-light">
            <tr>
                <th>#</th>
                <th className="text-start">Tên sản phẩm</th>
                <th className="text-start">Thành viên</th>
                <th className="text-start">Đánh giá</th>
                <th className="text-start">Nội dung</th>
                <th>Ngày tạo</th>
            </tr>
            </thead>
            <tbody>
            {votes.map((item, index) => (
                <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td className="text-start">{item.product_name}</td>
                    <td className="text-start">{item.user_name}</td>
                    <td className="text-start">
                        {renderStars(item.rating)}
                    </td>
                    <td className="text-start">{item.comment}</td>
                    <td>{moment(item?.created_at).format('DD-MM-YYYY')}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default VoteTable;
