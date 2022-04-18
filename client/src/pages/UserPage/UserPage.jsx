import {Formik, Form} from 'formik';
import CustomField from '../../components/CustomField/CustomField';
import styles from './UserPage.module.scss';
import * as yup from 'yup';
import Button from '../../components/Button/Button';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRef} from 'react';
import {logout, updateUserData} from '../../store/reducers/userReducer';
import {useNavigate} from 'react-router-dom';
import {updateUser} from '../../api/user';
import Preloader from '../../components/Preloader/Preloader';
import {showMessage} from '../../store/reducers/messageReducer';

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
    .matches(/^[a-zA-Z0-9\s,'-./]*$/),
  telephone: yup.string().min(7, 'min. 7 characters required').matches(/\d/g),
});

function UserPage() {
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuthorized, userData, isReady} = useSelector((state) => state.user);
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    for (const [key, val] of Object.entries(userData)) {
      if (formikRef.current !== null && key in formikRef.current.values)
        formikRef.current.setFieldValue(key, val);
    }
  }, [isReady]);

  useEffect(() => {
    if (!isAuthorized && isReady) navigate('/');
  }, [isAuthorized, isReady]);

  if (!isReady) return <Preloader />;

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    country: '',
    postal: '',
    city: '',
    address: '',
    telephone: '',
  };

  const handleFormSubmit = async (values) => {
    setIsSubmiting(true);
    try {
      await updateUser(values);
      dispatch(showMessage({text: 'Customer data updated successfully'}));
      dispatch(updateUserData(values));
      navigate('/');
    } catch (e) {
      dispatch(showMessage({text: 'Unable to update customer data', type: 'error'}));
      setIsSubmiting(false);
    }
  };

  const LogOut = () => dispatch(logout());

  return (
    <div className={styles.user}>
      <div className={styles.info}>
        <Formik
          onSubmit={handleFormSubmit}
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={yupValidationSchema}>
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
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
                <CustomField name="telephone" label="Phone" type="text" />
                <div className={styles.btnBox}>
                  <Button type="submit" disabled={isSubmiting}>
                    save changes
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={styles.btnOut}>
        <Button onClick={LogOut}>log out</Button>
      </div>
    </div>
  );
}

export default UserPage;
