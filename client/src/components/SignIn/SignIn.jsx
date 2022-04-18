import PropTypes from 'prop-types';
import {Form, Formik} from 'formik';
import CustomField from '../CustomField/CustomField';
import * as yup from 'yup';
import styles from './SignIn.module.scss';
import AltAuthorization from '../AltAuthorization/AltAuthorization';
import {newLogin} from '../../store/reducers/userReducer';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';
import {
  addTextActionMessage,
  addTypeActionMessage,
  switchActionMessage,
} from '../../store/reducers/actionMessageReducer';

const SignIn = ({closeModal}) => {
  const dispatch = useDispatch();

  const [isCorrect, setIsCorrect] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    loginOrEmail: '',
    password: '',
  };

  const actionMessage = (type, text, time) => {
    dispatch(addTypeActionMessage(type));
    dispatch(addTextActionMessage(text));
    dispatch(switchActionMessage());
    setTimeout(() => {
      dispatch(switchActionMessage());
    }, time);
  };

  const handleSubmit = (values) => {
    (async () => {
      try {
        setIsLoading(true);
        const {payload} = await dispatch(newLogin(values));
        if (payload) {
          setIsCorrect(true);
          setIsLoading(false);
          closeModal();
        }
        setIsLoading(false);
        setIsCorrect(false);
      } catch (e) {
        setIsLoading(false);
        actionMessage('error', 'Something went wrong, please try to reload page', 1500);
      }
    })();
  };

  const yupValidationSchema = yup.object().shape({
    loginOrEmail: yup.string().required('Field is required'),
    password: yup
      .string()
      .required('Field is required ')
      .matches(/[0-9A-Za-z]/, 'Wrong password format'),
  });

  useEffect(() => {
    return () => {
      setIsCorrect(false);
      setIsLoading(false);
    };
  }, []);

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
              <CustomField name="loginOrEmail" label="Email / Username" type="text" />
              <CustomField name="password" label="Password" type="password" />
              <div className={styles.wrapper}>
                <span className={styles.incorrect}>
                  {!isCorrect && 'Incorrect login or password'}
                </span>
                <div className={styles.remindPassword}>Remind password</div>
              </div>
              <Button type={'submit'}>Sign In</Button>
            </Form>
            <AltAuthorization />
          </>
        );
      }}
    </Formik>
  );
};

SignIn.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default SignIn;
