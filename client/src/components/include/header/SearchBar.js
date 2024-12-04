import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, ListGroup } from 'react-bootstrap';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiProductService from '../../../api/apiProductService'; // Import service

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [history, setHistory] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // Load lịch sử tìm kiếm từ localStorage khi component mount
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setHistory(savedHistory);
    }, []);

    // Gọi API để lấy gợi ý khi người dùng nhập
    const handleInputChange = async (e) => {
        const value = e.target.value;
        setSearchInput(value);

        if (value.trim() === '') {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        setShowDropdown(true); // Hiển thị dropdown khi có dữ liệu

        try {
            const params = { q: value }; // Truyền query vào params
            const response = await apiProductService.getLists(params); // Gọi API
            setSuggestions(response.data.data || []); // Giả sử response trả về danh sách từ khóa trong `data`
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    // Xử lý khi người dùng nhấn Enter hoặc click vào gợi ý
    const handleSearch = (query) => {
        // Lưu lịch sử tìm kiếm
        const updatedHistory = [query, ...history.filter((item) => item !== query)].slice(0, 10);
        setHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

        // Chuyển hướng đến trang tìm kiếm
        navigate(`/search?q=${encodeURIComponent(query)}`);

        // Ẩn dropdown
        setShowDropdown(false);
        setSearchInput(''); // Reset input sau khi tìm kiếm
    };

    // Xóa từng item trong lịch sử tìm kiếm
    const handleDeleteHistoryItem = (item) => {
        const updatedHistory = history.filter((historyItem) => historyItem !== item);
        setHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    // Xóa toàn bộ lịch sử tìm kiếm
    const handleClearHistory = () => {
        setHistory([]);
        localStorage.removeItem('searchHistory');
    };

    return (
        <div className="search-bar position-relative" style={{ width: "60%", height: "40px" }}>
            {/* Input tìm kiếm */}
            <Form className="d-flex" onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchInput);
            }}>
                <FormControl
                    type="search"
                    placeholder="Bạn đang tìm kiếm gì"
                    value={searchInput}
                    onChange={handleInputChange}
                    className="me-2"
                />
                <Button variant="primary" onClick={() => handleSearch(searchInput)}>
                    <FaSearch />
                </Button>
            </Form>

            {/* Gợi ý từ khóa */}
            {showDropdown && (
                <div className="suggestions-dropdown position-absolute bg-white shadow rounded w-100">
                    <ListGroup>
                        {suggestions.length > 0 && (
                            <>
                                <ListGroup.Item variant="secondary">Gợi ý</ListGroup.Item>
                                {suggestions.map((suggestion, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        action
                                        onClick={() => handleSearch(suggestion.name)} // Giả sử `name` là trường từ khóa
                                    >
                                        {suggestion.name}
                                    </ListGroup.Item>
                                ))}
                            </>
                        )}
                        {history.length > 0 && (
                            <>
                                <ListGroup.Item variant="secondary" className="d-flex justify-content-between align-items-center">
                                    <span>Lịch sử tìm kiếm</span>
                                    <Button variant="danger" size="sm" onClick={handleClearHistory}>
                                        Xóa tất cả
                                    </Button>
                                </ListGroup.Item>
                                {history.map((item, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        action
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <span onClick={() => handleSearch(item)}>{item}</span>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteHistoryItem(item)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                                <hr />
                            </>
                        )}
                    </ListGroup>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
