import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTimes } from "react-icons/fa";
import Select from 'react-select';

const UserFormModal = ({ showUserModal, setShowUserModal, editingUser, handleAddEditUser }) => {
	const [validationSchema, setValidationSchema] = useState(
		Yup.object({
			name: Yup.string().required('Họ tên không được để trống'),
			email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
			phone: Yup.string()
				.required('Số điện thoại không được để trống')
				.matches(/^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số'),
		})
	);

	useEffect(() => {
		if (!editingUser) {
			setValidationSchema(
				Yup.object({
					name: Yup.string().required('Họ tên không được để trống'),
					email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
					phone: Yup.string()
						.required('Số điện thoại không được để trống')
						.matches(/^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số'),
					password: Yup.string().required('Mật khẩu không được để trống'),
				})
			);
		} else {
			setValidationSchema(
				Yup.object({
					name: Yup.string().required('Họ tên không được để trống'),
					email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
					phone: Yup.string()
						.required('Số điện thoại không được để trống')
						.matches(/^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số'),
				})
			);
		}
	}, [editingUser]);

	const initialValues = {
		name: editingUser?.name || '',
		email: editingUser?.email || '',
		phone: editingUser?.phone || '',
		user_type: editingUser?.user_type || 'USER',
		status: editingUser?.status || 1,
		password: '',
	};

	const handleSubmit = (values) => {
		handleAddEditUser(values);
	};

	const userTypeOptions = [
		{ value: 'USER', label: 'USER' },
		{ value: 'ADMIN', label: 'ADMIN' },
	];

	return (
		<Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>{editingUser ? 'Cập nhật' : 'Thêm mới'}</Modal.Title>
			</Modal.Header>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
				enableReinitialize
			>
				{({ handleSubmit, isSubmitting, setFieldValue, values }) => (
					<Form onSubmit={handleSubmit}>
						<Modal.Body>
							<Form.Group className={'mb-3'}>
								<Form.Label>Họ tên</Form.Label>
								<Field name="name" type="text" className="form-control" />
								<ErrorMessage name="name" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className={'mb-3'}>
								<Form.Label>Email</Form.Label>
								<Field name="email" type="email" className="form-control" />
								<ErrorMessage name="email" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className={'mb-3'}>
								<Form.Label>Số điện thoại</Form.Label>
								<Field name="phone" type="text" className="form-control" />
								<ErrorMessage name="phone" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className={'mb-3'}>
								<Form.Label>Loại người dùng</Form.Label>
								<Select
									options={userTypeOptions}
									value={userTypeOptions.find(option => option.value === values.user_type)}
									onChange={(selectedOption) => setFieldValue('user_type', selectedOption.value)}
									className="basic-single"
									classNamePrefix="select"
								/>
								<ErrorMessage name="user_type" component="div" className="text-danger" />
							</Form.Group>

							{!editingUser && (
								<Form.Group className={'mb-3'}>
									<Form.Label>Mật khẩu</Form.Label>
									<Field name="password" type="password" className="form-control" />
									<ErrorMessage name="password" component="div" className="text-danger" />
								</Form.Group>
							)}
						</Modal.Body>
						<Modal.Footer>
							<Button
								className={'d-flex justify-content-between align-items-center'}
								size={'sm'}
								variant="danger"
								onClick={() => setShowUserModal(false)}
							>
								Huỷ bỏ <FaTimes className={'ms-2'} />
							</Button>
							<Button
								className={'d-flex justify-content-between align-items-center'}
								size={'sm'}
								type="submit"
								variant="primary"
								disabled={isSubmitting}
							>
								{editingUser ? 'Cập nhật' : 'Thêm mới'} <FaSave className={'ms-2'} />
							</Button>
						</Modal.Footer>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default UserFormModal;
