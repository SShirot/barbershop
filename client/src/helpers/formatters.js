// src/helpers/formatters.js

import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";
import React from "react";

export const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
};

export const createSlug = (name) => {
    // Bảng chuyển đổi ký tự tiếng Việt sang không dấu
    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD') // Tách tổ hợp các ký tự Unicode
            .replace(/[\u0300-\u036f]/g, '') // Xóa dấu kết hợp
            .replace(/đ/g, 'd') // Chuyển 'đ' thành 'd'
            .replace(/Đ/g, 'D'); // Chuyển 'Đ' thành 'D'
    };

    return removeVietnameseTones(name)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Xóa các ký tự không phải là chữ cái, số, dấu cách hoặc dấu gạch ngang
        .replace(/\s+/g, '-')          // Thay thế dấu cách bằng dấu gạch ngang
        .replace(/-+/g, '-');          // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
};

export const formatCurrencyInput = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const stripHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
};

export const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
        <span key={index}>
        {index < rating ? (
            <FaStar className="text-warning" />
        ) : (
            <FaRegStar className="text-warning" />
        )}
      </span>
    ));
};

export const renderStarsItem = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating === null || rating === undefined || rating === 0) {
            // Hiển thị sao mờ nếu không có đánh giá
            stars.push(<FaRegStar className={'me-1'} key={`empty-star-${i}`} style={{ color: 'gray' }} />);
        } else if (i <= Math.floor(rating)) {
            // Hiển thị sao đầy
            stars.push(<FaStar className={'me-1'} key={`star-${i}`} style={{ color: 'orange' }} />);
        } else if (i - rating < 1) {
            // Hiển thị nửa sao
            stars.push(<FaStarHalfAlt className={'me-1'} key={`half-star-${i}`} style={{ color: 'orange' }} />);
        } else {
            // Hiển thị sao mờ
            stars.push(<FaRegStar className={'me-1'} key={`empty-star-${i}`} style={{ color: 'gray' }} />);
        }
    }
    return stars;
};
