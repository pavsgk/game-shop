import PropTypes from 'prop-types';
import {Form, Formik} from 'formik';
import CustomField from '../CustomField/CustomField';
import * as yup from 'yup';
import styles from './SignUp.module.scss';
import AltAuthorization from '../AltAuthorization/AltAuthorization';
import {createNewUser} from '../../api/user';
import {useState} from 'react';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';
import {useDispatch} from 'react-redux';
import {newLogin} from '../../store/reducers/userReducer';
import {showMessage} from '../../store/reducers/messageReducer';

const SignUp = ({closeModal}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    (async () => {
      try {
        setIsLoading(true);
        await createNewUser(values);
        setIsLoading(false);
        dispatch(showMessage({text: 'you have been successfully registered!'}));
        actions.resetForm();

        const loginOrEmail = values.login;
        const password = values.password;
        const valuesForSignIn = {loginOrEmail, password};
        const result = await dispatch(newLogin(valuesForSignIn));
        if (result.payload) {
          closeModal();
        }
      } catch (e) {
        setIsLoading(false);
        dispatch(
          showMessage({text: 'Something went wrong, please try to reload page', type: 'error'}),
        );
      }
    })();
  };

  const yupValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('Field is required')
      .min(2, 'min. 2 characters required')
      .matches(/[A-Za-z/s]/),
    lastName: yup
      .string()
      .required('Field is required')
      .min(2, 'min. 2 characters required')
      .matches(/[A-Za-z/s]/),
    email: yup.string().required('Field is required').email('Wrong email address entered'),
    login: yup
      .string()
      .required('Field is required')
      .min(3, 'min. 2 characters required')
      .max(10, 'max. 10 characters required')
      .matches(/^[a-zA-Z0-9]+$/),
    password: yup
      .string()
      .required('Field is required ')
      .min(7, 'min. 7 characters required')
      .matches(/[0-9A-Za-z]/, 'Wrong password format'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={yupValidationSchema}>
      {() => {
        return (
          <>
            {isLoading && <Preloader />}
            <Form className={styles.form}>
              <div className={styles.wrapper}>
                <CustomField name="firstName" label="Name" type="text" autoCapitalize="none" />
                <CustomField name="lastName" label="Surname" type="text" autoCapitalize="none" />
              </div>
              <CustomField name="email" label="Email" type="text" autoCapitalize="none" />
              <CustomField name="login" label="Login" type="text" />
              <CustomField name="password" label="Password" type="password" />
              <Button type={'submit'}>Register</Button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

SignUp.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default SignUp;
