import {Form, Formik} from 'formik';
import CustomField from '../CustomField/CustomField';
import * as yup from 'yup';
import styles from './SignUp.module.scss';
import AltAuthorization from '../AltAuthorization/AltAuthorization';
import {registration} from '../../api/user';
import {useState} from 'react';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';
import {useDispatch} from 'react-redux';
import {newLogin} from '../../store/reducers/userReducer';

const SignUp = ({closeModal}) => {
  const [isSuccesReg, setIsSuccesReg] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    registration(values)
      .then(async (res) => {
        if (res.status === 200) {
          actions.resetForm();
          setIsSuccesReg(true);
          setTimeout(() => {
            setIsSuccesReg(false);
          }, 3000);

          const loginOrEmail = values.login;
          const password = values.password;
          const valuesForSignIn = {loginOrEmail, password};
          const result = await dispatch(newLogin(valuesForSignIn));
          if (result.payload) {
            closeModal();
          }
        }
      })
      .catch((error) => {
        console.warn(error);
      });
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
      .min(2, 'min. 2 characters required')
      .matches(/[A-Za-z/s]/),
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
      {({dirty, isSubmitting}) => {
        return (
          <>
            {isSubmitting && <Preloader />}
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
            <AltAuthorization />
            {isSuccesReg && (
              <div className={styles.successReg}>you have been successfully registered!</div>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default SignUp;
