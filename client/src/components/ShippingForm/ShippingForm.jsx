import {Formik, Form, useFormikContext} from 'formik';
import CustomField from '../CustomField/CustomField';
import styles from './ShippingForm.module.scss';
import * as yup from 'yup';
import Button from '../Button/Button';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {switchTab, updateFields} from '../../store/reducers/checkoutReducer';
import store from '../../store/store';
import {useRef} from 'react';

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
  city: yup
    .string()
    .required('Enter city')
    .min(2, 'min. 2 characters required')
    .matches(/[A-Za-z/s]/),
  postal: yup
    .string()
    .required('Enter zip code')
    .min(5, 'min. 5 characters required')
    .matches(/^\d{5}(?:[-\s]\d{4})?$/),
  address: yup
    .string()
    .required('Enter adress')
    .min(5, 'min. 5 characters required')
    .matches(/^[a-zA-Z0-9\s,'-./]*$/),
  mobile: yup.string().required('Enter phone').min(7, 'min. 7 characters required').matches(/\d/g),
  email: yup.string().email('Incorrect email').required('Enter email'),
});

function AutoSaver() {
  const {values, touched} = useFormikContext();
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
  }, [dispatch, values, touched]);

  return null;
}

function ShippingForm() {
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const {isReady, isAuthorized} = useSelector((state) => state.user);

  useEffect(() => {
    const {
      checkout: {checkoutFields},
    } = store.getState();
    if (formikRef.current) {
      for (const [key, val] of Object.entries(checkoutFields)) {
        formikRef.current.setFieldValue(key, val);
      }
    }
  }, [isReady, isAuthorized]);

  const initialValues = {
    firstName: '',
    lastName: '',
    country: '',
    postal: '',
    city: '',
    address: '',
    mobile: '',
    email: '',
  };

  const handleSubmit = () => {
    dispatch(switchTab(1));
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
          <CustomField name="city" label="City" type="text" />
          <CustomField name="postal" label="Zip code" type="text" />
          <div className={styles.address}>
            <CustomField name="address" label="Address" type="text" />
          </div>
          <CustomField name="mobile" label="Phone" type="text" />
          <CustomField name="email" label="Email" type="text" />
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
