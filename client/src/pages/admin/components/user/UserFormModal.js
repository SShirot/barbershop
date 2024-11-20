import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTimes } from "react-icons/fa";

const UserFormModal = ( { showUserModal, setShowUserModal, editingUser, handleAddEditUser } ) =>
{
	// const validationSchema = Yup.object({
	//     name: Yup.string().required('Họ tên không được để trống'),
	//     email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
	//     phone: Yup.string()
	//         .required('Số điện thoại không được để trống')
	//         .matches(/^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số'),
	//      // password: Yup.string()
	// .required(editingUser ? false : 'Mật khẩu không được để trống')// Bỏ điều kiện trong khi chỉnh sửa
	// });

	const [ validationSchema, setValidationSchema ] = useState( Yup.object( {
		name: Yup.string().required( 'Họ tên không được để trống' ),
		email: Yup.string().email( 'Email không hợp lệ' ).required( 'Email không được để trống' ),
		phone: Yup.string()
			.required( 'Số điện thoại không được để trống' )
			.matches( /^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số' ),
		// Bỏ điều kiện trong khi chỉnh sửa
	} ) );

	useEffect( () =>
	{
		if ( !editingUser )
		{
			setValidationSchema( Yup.object( {
				name: Yup.string().required( 'Họ tên không được để trống' ),
				email: Yup.string().email( 'Email không hợp lệ' ).required( 'Email không được để trống' ),
				phone: Yup.string()
					.required( 'Số điện thoại không được để trống' )
					.matches( /^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số' ),
				password: Yup.string()
					.required( 'Mật khẩu không được để trống' )
			} ) )
		} else
		{
			setValidationSchema( Yup.object( {
				name: Yup.string().required( 'Họ tên không được để trống' ),
				email: Yup.string().email( 'Email không hợp lệ' ).required( 'Email không được để trống' ),
				phone: Yup.string()
					.required( 'Số điện thoại không được để trống' )
					.matches( /^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số' )

			} ) )
		}
	}, [ editingUser ] )

	const initialValues = {
		name: editingUser?.name || '',
		email: editingUser?.email || '',
		phone: editingUser?.phone || '',
		status: editingUser?.status || 1,
		password: '',
	};

	const handleSubmit = ( values ) =>
	{
		handleAddEditUser( values );
	};

	return (
		<Modal show={ showUserModal } onHide={ () => setShowUserModal( false ) }>
			<Modal.Header closeButton>
				<Modal.Title>{ editingUser ? 'Cập nhật' : 'Thêm mới' }</Modal.Title>
			</Modal.Header>
			<Formik
				initialValues={ initialValues }
				validationSchema={ validationSchema }
				onSubmit={ handleSubmit }
				enableReinitialize
			>
				{ ( { handleSubmit, isSubmitting } ) => (
					<Form onSubmit={ handleSubmit }>
						<Modal.Body>
							<Form.Group className={ 'mb-3' }>
								<Form.Label>Họ tên</Form.Label>
								<Field
									name="name"
									type="text"
									className="form-control"
								/>
								<ErrorMessage name="name" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className={ 'mb-3' }>
								<Form.Label>Email</Form.Label>
								<Field
									name="email"
									type="email"
									className="form-control"
								/>
								<ErrorMessage name="email" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className={ 'mb-3' }>
								<Form.Label>Số điện thoại</Form.Label>
								<Field
									name="phone"
									type="text"
									className="form-control"
								/>
								<ErrorMessage name="phone" component="div" className="text-danger" />
							</Form.Group>

							{ !editingUser && (
								<Form.Group className={ 'mb-3' }>
									<Form.Label>Mật khẩu</Form.Label>
									<Field
										name="password"
										type="password"
										className="form-control"
									/>
									<ErrorMessage name="password" component="div" className="text-danger" />
								</Form.Group>
							) }
						</Modal.Body>
						<Modal.Footer>
							<Button className={ 'd-flex justify-content-between align-items-center' } size={ 'sm' } variant="danger" onClick={ () => setShowUserModal( false ) }>
								Huỷ bỏ <FaTimes className={ 'ms-2' } />
							</Button>
							<Button className={ 'd-flex justify-content-between align-items-center' } size={ 'sm' } type="submit" variant="primary" disabled={ isSubmitting }>
								{ editingUser ? 'Cập nhật' : 'Thêm mới' } <FaSave className={ 'ms-2' } />
							</Button>
						</Modal.Footer>
					</Form>
				) }
			</Formik>
		</Modal>
	);
};

export default UserFormModal;
