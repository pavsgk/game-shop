import {Formik, Form, useFormikContext} from 'formik';
import CustomField from '../../components/CustomField/CustomField';
import styles from './UserPage.module.scss';
import * as yup from 'yup';
import Button from '../../components/Button/Button';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {switchTab, updateFields} from '../../store/reducers/checkoutReducer';
import store from '../../store/store';
import {useRef} from 'react';
import instance from '../../api/instance';
import {logout} from '../../store/reducers/userReducer';
import {useLocation, useNavigate} from 'react-router-dom';

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
  email: yup.string().email('Incorrect email').required('Enter email'),
  login: yup
    .string()
    .required('Field is required')
    .min(2, 'min. 2 characters required')
    .matches(/[A-Za-z/s]/),
  country: yup
    .string()
    .min(2, 'min. 2 characters required')
    .matches(/[A-Za-z/s]/),
  city: yup
    .string()
    .min(2, 'min. 2 characters required')
    .matches(/[A-Za-z/s]/),
  postal: yup
    .string()
    .min(5, 'min. 5 characters required')
    .matches(/^\d{5}(?:[-\s]\d{4})?$/),
  address: yup
    .string()
    .min(5, 'min. 5 characters required')
    .matches(/^[a-zA-Z0-9\s,'-]*$/),
  mobile: yup.string().min(7, 'min. 7 characters required').matches(/\d/g),
  password: yup
    .string()
    .required('Enter password')
    .required('Field is required ')
    .matches(/[0-9A-Za-z]/, 'Wrong password format'),
  newPassword: yup
    .string()
    .required('Enter password')
    .required('Field is required ')
    .matches(/[0-9A-Za-z]/, 'Wrong password format'),
  syncProfile: yup.boolean(),
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

function UserPage() {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthorized} = useSelector((state) => state.user);

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

  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await instance.get('/customers/customer');
      setUser(res.data);
      console.log(res.data);
    })();
  }, []);

  useEffect(() => {
    !isAuthorized && navigate('/');
  }, [isAuthorized]);

  let initialValues = null;

  (function getInitialValues() {
    if (user.length > 0) {
      initialValues = user;
    } else {
      initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        country: '',
        postal: '',
        city: '',
        address: '',
        mobile: '',
        password: '',
        newPassword: '',
        syncProfile: false,
      };
    }
  })();

  const handleSubmit = () => {
    dispatch(switchTab(1));
  };

  function LogOut() {
    dispatch(logout());
  }

  return (
    <div className={styles.user}>
      <div className={styles.info}>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={yupValidationSchema}>
          <Form>
            <div className={styles.section}>
              <p className={styles.text}>required fields</p>
              <CustomField
                className={styles.string}
                name="firstName"
                label="First Name"
                type="text"
              />
              <CustomField
                className={styles.string}
                name="lastName"
                label="Last Name"
                type="text"
              />
              <CustomField name="email" label="Email" type="text" />
              <CustomField name="login" label="Login" type="text" />
            </div>
            <div className={styles.section}>
              <div className={styles.text}>delivery information</div>
              <CustomField name="country" label="Country" type="text" />
              <CustomField name="city" label="City" type="text" />
              <CustomField name="postal" label="Zip code" type="text" />
              <CustomField name="address" label="Address" type="text" />
              <CustomField name="mobile" label="Phone" type="text" />
              <div className={styles.btnBox}>
                <Button type="submit">save changes</Button>
              </div>
            </div>
            <AutoSaver />
          </Form>
        </Formik>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className={styles.section}>
              <p className={styles.text}>change password</p>
              <CustomField name="password" label="password" type="text" />
              <CustomField name="newPassword" label="newPassword" type="text" />
              <div className={styles.btnBox}>
                <Button type="submit">save password</Button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <div className={styles.btnOut}>
        <Button onClick={LogOut} type="submit">
          log out
        </Button>
      </div>
    </div>
  );
}

export default UserPage;
