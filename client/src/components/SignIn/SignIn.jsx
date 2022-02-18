import {Form, Formik} from 'formik';
import CustomField from '../CustomField/CustomField';
import * as yup from 'yup';
import styles from './SignIn.module.scss';
import AltAuthorization from '../AltAuthorization/AltAuthorization';
import {newLogin} from '../../store/reducers/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';

const SignIn = ({closeModal}) => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const [isCorrect, setIsCorrect] = useState(true);

  const initialValues = {
    loginOrEmail: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    const result = await dispatch(newLogin(values));
    console.log(result, 'result');
    if (result.payload) {
      setIsCorrect(true);
      closeModal();
      return;
    }
    if (!result.payload) {
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    console.log(isAuthorized);
  }, [isAuthorized]);

  const yupValidationSchema = yup.object().shape({
    loginOrEmail: yup.string().required('Field is required ').email('Wrong email address entered'),
    password: yup
      .string()
      .required('Field is required ')
      .matches(/[0-9A-Za-z]/, 'Wrong password format'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={yupValidationSchema}>
      {({isSubmitting}) => {
        return (
          <>
            {isSubmitting && <Preloader />}
            <Form className={styles.form}>
              <CustomField name="loginOrEmail" label="Email" type="text" />
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

export default SignIn;
