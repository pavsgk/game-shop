import {Formik, Form, Field} from 'formik';
import styles from './ShippingForm.module.scss';
import * as yup from 'yup';

function ShippingForm() {
  const initalValues = {
    firstName: '',
    lastName: '',
    country: '',
    zipCode: '',
    address: '',
    phone: '',
    syncProfile: false,
  };

  const yupValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('Enter name')
      .min(2, 'min. 2 characters required')
      .matches(/[A-Za-z/s]/),
    lastName: yup
      .string()
      .required('Enter last name')
      .min(2, 'min. 2 characters required')
      .matches(/[A-Za-z/s]/),
    country: yup
      .string()
      .required('Enter country')
      .min(2, 'min. 2 characters required')
      .matches(/[A-Za-z/s]/),
    zipCode: yup
      .string()
      .required('Enter zipCode')
      .min(5, 'min. 5 characters required')
      .matches(/^\d{5}(?:[-\s]\d{4})?$/),
    address: yup
      .string()
      .required('Enter zipCode')
      .min(5, 'min. 5 characters required')
      .matches(/^[a-zA-Z0-9\s,'-]*$/),
    phone: yup.string().required('Enter phone').min(7, 'min. 7 characters required').matches(/\d/g),
    syncProfile: yup.boolean(),
  });

  const handleSubmit = (val, actions) => {
    console.log('submit');
  };

  return (
    <Formik
      initialValues={initalValues}
      onSubmit={handleSubmit}
      validationSchema={yupValidationSchema}>
      {(formik) => {
        return (
          <Form className={styles.form}>
            <Field name="firstName" label="First Name" type="text" />
            <Field name="lastName" label="Last Name" type="text" />
            <Field name="country" label="Country" type="text" />
          </Form>
        );
      }}
    </Formik>
  );
}

export default ShippingForm;
