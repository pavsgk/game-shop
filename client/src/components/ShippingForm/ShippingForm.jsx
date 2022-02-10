import {Formik, Form, useFormikContext} from 'formik';
import CustomField from '../CustomField/CustomField';
import styles from './ShippingForm.module.scss';
import * as yup from 'yup';
import Button from '../Button/Button';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {updateFields} from '../../store/reducers/checkoutReducer';
import store from '../../store/store';
import {useRef} from 'react';
import {values} from 'lodash';

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
    .required('Enter zip code')
    .min(5, 'min. 5 characters required')
    .matches(/^\d{5}(?:[-\s]\d{4})?$/),
  address: yup
    .string()
    .required('Enter adress')
    .min(5, 'min. 5 characters required')
    .matches(/^[a-zA-Z0-9\s,'-]*$/),
  phone: yup.string().required('Enter phone').min(7, 'min. 7 characters required').matches(/\d/g),
  syncProfile: yup.boolean(),
});

function AutoSaver() {
  const {values, touched} = useFormikContext();
  const ctx = useFormikContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(touched).length === 0) return;
    let isValid = false;
    try {
      yupValidationSchema.validateSync(values);
      isValid = true;
    } catch {}

    dispatch(
      updateFields({
        ...values,
        isValid,
      }),
    );
  }, [values]);

  return null;
}

function ShippingForm() {
  const formikRef = useRef();

  useEffect(() => {
    const {
      checkout: {checkoutFields},
    } = store.getState();
    if (formikRef) {
      for (const [key, val] of Object.entries(checkoutFields)) {
        formikRef.current.setFieldValue(key, val);
      }
    }
  }, []);

  const initialValues = {
    firstName: '',
    lastName: '',
    country: '',
    zipCode: '',
    address: '',
    phone: '',
    syncProfile: false,
  };

  const handleSubmit = (val, actions) => {
    console.log(val);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={yupValidationSchema}>
      <Form className={styles.formBox}>
        <div className={styles.form}>
          <CustomField name="firstName" label="First Name" type="text" />
          <CustomField name="lastName" label="Last Name" type="text" />
          <CustomField name="country" label="Country" type="text" />
          <CustomField name="zipCode" label="Zip code" type="text" />
          <div className={styles.address}>
            <CustomField name="address" label="Address" type="text" />
          </div>
          <CustomField name="phone" label="Phone" type="text" />

          <div className={styles.checkbox}>
            <input id="one" type="checkbox" />
            <label htmlFor="one">
              <span> </span>
              Save Information to my profile
              <ins>
                <i>Save Information to my profile</i>
              </ins>
            </label>
          </div>
        </div>

        <div className={styles.btnNext}>
          <Button type="submit">Next</Button>
        </div>
        <AutoSaver />
      </Form>
    </Formik>
  );
}

export default ShippingForm;
