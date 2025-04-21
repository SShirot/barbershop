import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Card, Badge } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import serviceService from "../../api/serviceService";
import toastr from "toastr";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const BookingModal = ({ show, handleClose, API, setSuccessMessage }) => {
  const [services, setServices] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [is_home_service, setIsHomeVisit] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchServices();
    fetchAdmins();
  }, [API]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}service`);
      setServices(response.data.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toastr.error("Không thể tải danh sách dịch vụ", "Lỗi");
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${API}users?page=1&page_size=1000`);
      setAdmins(response.data.data.data.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toastr.error("Không thể tải danh sách nhân viên", "Lỗi");
    }
  };

  const fetchAvailableSlots = async (adminId, date) => {
    if (!adminId || !date) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`${API}admin/assigned-services/staff-available-slots`, {
        params: {
          staff_id: adminId,
          date: format(date, 'yyyy-MM-dd')
        }
      });
      setAvailableSlots(response.data.data);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      toastr.error("Không thể tải khung giờ trống", "Lỗi");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = (serviceId) => {
    const service = services.find(s => s.id === parseInt(serviceId));
    setSelectedService(service);
  };

  const handleAdminChange = (adminId) => {
    const admin = admins.find(a => a.id === parseInt(adminId));
    setSelectedAdmin(admin);
  };

  const handleDateChange = (date, setFieldValue) => {
    setFieldValue('date', date);
    if (selectedAdmin) {
      fetchAvailableSlots(selectedAdmin.id, date);
    }
  };

  const handleBookingSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const bookingData = {
        user_id: user.id,
        service_id: values.service,
        admin_id: values.admin,
        name: selectedService.name,
        price: selectedService.price,
        status: "pending",
        date: format(values.date, 'yyyy-MM-dd'),
        time: format(values.time, 'HH:mm'),
        is_home_service: values.is_home_service,
        address: values.is_home_service ? values.address : null,
        note: values.note
      };

      const response = await serviceService.register(bookingData);
      handleClose();
      resetForm();
      toastr.success("Đặt lịch thành công!", "Thành công");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toastr.error("Có lỗi xảy ra, vui lòng thử lại", "Lỗi");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    service: Yup.string().required("Vui lòng chọn dịch vụ"),
    admin: Yup.string().required("Vui lòng chọn nhân viên"),
    date: Yup.date().required("Vui lòng chọn ngày"),
    time: Yup.date().required("Vui lòng chọn giờ"),
    address: Yup.string().when("is_home_service", {
      is: true,
      then: (schema) => schema.required("Vui lòng nhập địa chỉ"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Đặt lịch cắt tóc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            service: "",
            admin: "",
            date: null,
            time: null,
            is_home_service: false,
            address: "",
            note: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleBookingSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Chọn kiểu tóc</Form.Label>
                    <Form.Select
                      name="service"
                      value={values.service}
                      onChange={(e) => {
                        handleChange(e);
                        handleServiceChange(e.target.value);
                      }}
                      onBlur={handleBlur}
                      isInvalid={touched.service && !!errors.service}
                    >
                      <option value="">Chọn kiểu tóc...</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} - {service.price.toLocaleString('vi-VN')}đ
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.service}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {selectedService && (
                    <Card className="mb-3">
                      <Card.Body>
                        <h5>Thông tin kiểu tóc</h5>
                        <p><strong>Tên kiểu:</strong> {selectedService.name}</p>
                        <p><strong>Giá:</strong> {selectedService.price.toLocaleString('vi-VN')}đ</p>
                        <p><strong>Thời gian thực hiện:</strong> {selectedService.duration} phút</p>
                        <p><strong>Mô tả:</strong> {selectedService.description}</p>
                      </Card.Body>
                    </Card>
                  )}
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Chọn thợ cắt</Form.Label>
                    <Form.Select
                      name="admin"
                      value={values.admin}
                      onChange={(e) => {
                        handleChange(e);
                        handleAdminChange(e.target.value);
                      }}
                      onBlur={handleBlur}
                      isInvalid={touched.admin && !!errors.admin}
                    >
                      <option value="">Chọn thợ cắt...</option>
                      {admins.map((admin) => (
                        <option key={admin.id} value={admin.id}>
                          {admin.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.admin}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {selectedAdmin && (
                    <Card className="mb-3">
                      <Card.Body>
                        <h5>Thông tin thợ cắt</h5>
                        <p><strong>Tên:</strong> {selectedAdmin.name}</p>
                        <p><strong>Kinh nghiệm:</strong> {selectedAdmin.experience} năm</p>
                        <p><strong>Đánh giá:</strong> {selectedAdmin.rating}/5</p>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Chọn ngày cắt</Form.Label>
                    <DatePicker
                      selected={values.date}
                      onChange={(date) => handleDateChange(date, setFieldValue)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      locale={vi}
                      className="form-control"
                      placeholderText="Chọn ngày cắt"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.date}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Chọn giờ cắt</Form.Label>
                    <Form.Select
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.time && !!errors.time}
                      disabled={!values.date || loading}
                    >
                      <option value="">Chọn giờ cắt...</option>
                      {availableSlots.map((slot) => (
                        <option key={slot.id} value={slot.start_time}>
                          {format(new Date(`2000-01-01T${slot.start_time}`), 'HH:mm')} - 
                          {format(new Date(`2000-01-01T${slot.end_time}`), 'HH:mm')}
                        </option>
                      ))}
                    </Form.Select>
                    {loading && <small className="text-muted">Đang tải khung giờ...</small>}
                    {!loading && values.date && availableSlots.length === 0 && (
                      <div className="text-danger mt-2">
                        Hiện tại đã hết lịch, quý khách vui lòng đăng kí lại vào ngày khác
                      </div>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {errors.time}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="is_home_service"
                  label="Cắt tóc tại nhà"
                  checked={values.is_home_service}
                  onChange={(e) => {
                    handleChange(e);
                    setIsHomeVisit(e.target.checked);
                  }}
                />
              </Form.Group>

              {values.is_home_service && (
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Nhập địa chỉ"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.address && !!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Yêu cầu thêm</Form.Label>
                <Form.Control
                  as="textarea"
                  name="note"
                  placeholder="Nhập yêu cầu thêm (nếu có)"
                  value={values.note}
                  onChange={handleChange}
                  rows={3}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting || loading || (!loading && values.date && availableSlots.length === 0)}
                >
                  {isSubmitting ? "Đang xử lý..." : 
                   loading ? "Đang tải lịch..." :
                   (!loading && values.date && availableSlots.length === 0) ? "Không có lịch trống" :
                   "Đặt lịch cắt"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
