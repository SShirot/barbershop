import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Breadcrumb, Nav, Form, Spinner, Tab, Tabs, Pagination} from 'react-bootstrap';
import { Link } from "react-router-dom";
import apiWorkSchedulesService from '../../../api/apiWorkSchedulesService';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
const localizer = momentLocalizer(moment);

const transformData = (data) => {
    return data.map((item) => {
        const start = new Date(item.work_date); // Thời gian bắt đầu
        const end = new Date(item.work_date); // Kết thúc cùng ngày
        const shiftTime = {
            morning: [8, 12], // Giờ bắt đầu và kết thúc ca sáng
            afternoon: [13, 17], // Ca chiều
            night: [18, 22], // Ca tối
            full_day: [8, 22], // Cả ngày
        };

        const [startHour, endHour] = shiftTime[item.shift];
        start.setHours(startHour, 0, 0, 0);
        end.setHours(endHour, 0, 0, 0);

        return {
            title: `${item.user_name} (${item.shift})`, // Tên nhân viên và ca làm
            start, // Thời gian bắt đầu
            end, // Thời gian kết thúc
            allDay: item.shift === 'full_day', // Nếu là cả ngày
        };
    });
};

const eventPropGetter = (event) => {
    let backgroundColor;
    switch (event.title.split('(')[1].replace(')', '')) { // Lấy shift từ title
        case 'morning':
            backgroundColor = '#f44336'; // Vàng
            break;
        case 'afternoon':
            backgroundColor = '#FF8C00'; // Cam
            break;
        case 'night':
            backgroundColor = '#1E90FF'; // Xanh dương
            break;
        case 'full_day':
            backgroundColor = '#32CD32'; // Xanh lá
            break;
        default:
            backgroundColor = '#D3D3D3'; // Xám
    }

    return {
        style: {
            backgroundColor,
            color: 'white', // Màu chữ
            border: 'none', // Bỏ viền
        },
    };
};

const WorkScheduleCalendar = ({ events }) => {
    return (
        <div style={{ height: 600 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                defaultView="month"
                views={['month', 'week', 'day']}
                style={{ height: '100%' }}
                eventPropGetter={eventPropGetter}
            />
        </div>
    );
};

const WorkSchedulesManager = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({
        from_date: moment().startOf("month").format("YYYY-MM-DD"),
        to_date: moment().endOf("month").format("YYYY-MM-DD"),
        page: 1,
        page_size : 1000,
    });

    useEffect(() => {
        const fetchWorkSchedules = async () => {
            try {
                const response = await apiWorkSchedulesService.getAll(filters);
                const event = transformData(response.data.data);
                setEvents(event);
            } catch (error) {
                console.error("Error fetching user data or work preferences:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkSchedules();
    }, [filters]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    const handleFilterChange = (newFilters) => {
        setFilters({
            ...filters,
            ...newFilters,
        });
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
                            <Nav.Link as={Link} to="/admin/users">Tài khoản</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý lịch làm việc</h2>
                    </div>
                </Col>
                <Col xl={12}>
                    <WorkScheduleCalendar events={events}/>
                </Col>
            </Row>
        </Container>
    );
};

export default WorkSchedulesManager;
