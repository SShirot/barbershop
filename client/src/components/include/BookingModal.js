import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toastr from "toastr";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const BookingModal = ({ show, handleClose, API, setSuccessMessage }) => {
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [is_home_service, setIsHomeVisit] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (show) {
      fetchServices();
      fetchStaff();
    }
  }, [show, API]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}service`);
      if (response.data?.data?.data) {
        setServices(response.data.data.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toastr.error("Không thể tải danh sách dịch vụ", "Lỗi");
      setServices([]);
    }
  };

  const fetchStaff = async (date, time) => {
    if (!date || !time) return;
  
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const formattedTime = format(time, "HH:mm:ss");
  
      const response = await axios.get(`${API}user/staff-list/by-date`, {
        params: {
          date: formattedDate,
          time: formattedTime,
        },
      });
  
      if (response.data?.data) {
        setStaff(response.data.data);
      } else {
        setStaff([]);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
      toastr.error("Không thể tải danh sách nhân viên", "Lỗi");
      setStaff([]);
    }
  };

  const handleServiceChange = (serviceId) => {
    const service = services.find(s => s.id === parseInt(serviceId));
    setSelectedService(service);
  };

  const handleBookingSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const bookingData = {
        user_id: user.id,
        service_id: values.service,
        staff_id: values.staff ? parseInt(values.staff) : null,
        name: selectedService.name,
        price: selectedService.price,
        status: "pending",
        date: format(values.date, 'yyyy-MM-dd'),
        time: format(values.time, 'HH:mm'),
        is_home_service: values.is_home_service || 0,
        address: values.is_home_service ? values.address : null,
        note: values.note
      };

      await axios.post(`${API}admin/assigned-services/register`, bookingData);

      handleClose();
      resetForm();
      toastr.success("Đặt lịch thành công! Vui lòng chờ admin duyệt.", "Thành công");
      if (setSuccessMessage) {
        setSuccessMessage("Đặt lịch thành công! Vui lòng chờ admin duyệt.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toastr.error(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại", "Lỗi");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    service: Yup.string().required("Vui lòng chọn dịch vụ"),
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
            staff: "",
            date: null,
            time: "",
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
                      value={values.service || ""}
                      onChange={(e) => {
                        handleChange(e);
                        handleServiceChange(e.target.value);
                      }}
                  onBlur={handleBlur}
                  isInvalid={touched.service && !!errors.service}
                >
                      <option value="">Chọn kiểu tóc...</option>
                      {Array.isArray(services) && services.map((service) => (
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
                    <Form.Label>Chọn ngày cắt</Form.Label>
                    <DatePicker
                      selected={values.date}
                      onChange={(date) => {
                        setFieldValue('date', date)
                        if (values.time) fetchStaff(date, values.time);
                      }}
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

                  <Form.Group className="mb-3">
                    <Form.Label>Chọn giờ cắt</Form.Label>
                    <DatePicker
                      selected={values.time}
                      onChange={(time) => {
                        setFieldValue('time', time)
                        if (values.date) fetchStaff(values.date, time);
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Giờ"
                      dateFormat="HH:mm"
                      className="form-control"
                      placeholderText="Chọn giờ cắt"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.time}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Chọn thợ cắt (tùy chọn)</Form.Label>
                    <Form.Select
                      name="staff"
                      value={values.staff || ""}
                      onChange={(e) => {
                        console.log("Selected staff ID:", e.target.value); // 👈 log tại đây
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    >
                      <option value="">Chọn thợ cắt...</option>
                      {Array.isArray(staff) && staff.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                      <option value="any">Chọn thợ nào cũng được</option>
                    </Form.Select>
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
                    if (e.target.checked) {
                      setFieldValue('staff', null);
                    }
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Đặt lịch cắt"}
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
