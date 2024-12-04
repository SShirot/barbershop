import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import serviceService from "../../api/serviceService";
import toastr from "toastr";
import { useSelector } from "react-redux";

const BookingModal = ({ show, handleClose, API, setSuccessMessage }) => {
  const [services, setServices] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [is_home_service, setIsHomeVisit] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .get(`${API}service`)
      .then((response) => {
        setServices(response.data.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  }, [API]);

  useEffect(() => {
    axios
      .get(`${API}users?page=1&page_size=1000`)
      .then((response) => {
        console.info(
          "===========[] ===========[response] : ",
          response.data.data.data.data
        );
        setAdmins(response.data.data.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  }, [API]);

  const handleBookingSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Tìm kiếm dịch vụ đã chọn từ danh sách dịch vụ

      const selectedService = services.find(
        (service) => service.id === parseInt(values.service)
      );
      console.info("===========[] ===========[services] : ", services);
      // Tạo dữ liệu để gửi đến API, bao gồm các thông tin cần thiết
      const bookingData = {
        user_id: user.id,
        service_id: values.service,
        admin_id: values.admin,
        name: selectedService.name,
        price: selectedService.price,
        status: "pending",
        date: values.date,
        is_home_service: values.is_home_service,
        address: values.is_home_service ? values.address : null,
      };

      // Gọi API với dữ liệu đã chuẩn bị
      console.info("===========[] ===========[values] : ", bookingData);
      const response = await serviceService.register(bookingData);
      handleClose();
      resetForm();
      toastr.success("Đặt lịch thành công!", "Success");
    } catch (error) {
      console.error("There was an error booking the appointment!", error);
      toastr.error("Có lỗi xẩy ra, xin vui lòng thử lại", "Error");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    service: Yup.string().required("Vui lòng chọn dịch vụ"),
    date: Yup.date().required("Vui lòng chọn ngày khám"),
    address: Yup.string().when("is_home_service", {
      is: true,
      then: (schema) =>
        schema.required("Vui lòng nhập địa chỉ nếu chọn khám tại nhà"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Đăng ký dịch vụ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            service: "",
            date: "",
            is_home_service: false,
            address: "",
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="service" className={"mb-2"}>
                <Form.Label>Chọn dịch vụ</Form.Label>
                <Form.Control
                  as="select"
                  name="service"
                  value={values.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.service && !!errors.service}
                >
                  <option value="">Chọn dịch vụ...</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.service}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="action" className={"mb-2"}>
                <Form.Label>Chọn nhân viên</Form.Label>
                <Form.Control
                  as="select"
                  name="admin"
                  value={values.admin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.admin && !!errors.admin}
                >
                  <option value="">Chọn nhân viên...</option>
                  {admins.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.admin}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="date" className={"mb-2"}>
                <Form.Label>Chọn ngày </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.date && !!errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="is_home_service" className={"mb-2"}>
                <Form.Check
                  type="checkbox"
                  name="is_home_service"
                  label="Đến tại nhà"
                  checked={values.is_home_service}
                  onChange={(e) => {
                    handleChange(e);
                    setIsHomeVisit(e.target.checked);
                  }}
                />
              </Form.Group>

              {values.is_home_service && (
                <Form.Group controlId="address" className={"mb-2"}>
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

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Đặt lịch
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
