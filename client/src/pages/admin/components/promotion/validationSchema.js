import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    code: Yup.string().required('Required'),
    discountValue: Yup.number().required('Required').positive('Must be positive'),
    discountType: Yup.string().required('Required'),
    isUnlimited: Yup.boolean(),
    startDate: Yup.date().nullable().when('isUnlimited', {
        is: false,
        then: Yup.date().required('Start date is required'),
    }),
    endDate: Yup.date().nullable().when('isUnlimited', {
        is: false,
        then: Yup.date().required('End date is required'),
    }),
    usageLimit: Yup.number().nullable().positive('Must be positive'),
    isActive: Yup.boolean().required('Required'),
});

export default validationSchema;
