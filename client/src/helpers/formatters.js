// src/helpers/formatters.js

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
