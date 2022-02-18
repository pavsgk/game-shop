import {Form, Formik} from 'formik';
import CustomField from '../CustomField/CustomField';
import * as yup from 'yup';
import styles from './SignUp.module.scss';
import AltAuthorization from '../AltAuthorization/AltAuthorization';
import {registration} from '../../api/user';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';

const SignUp = ({setActive}) => {
  const [isSuccesReg, setIsSuccesReg] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    console.log(actions);

    registration(values)
      .then((res) => {
        if (res.status === 200) {
          actions.resetForm();
          setIsSuccesReg(true);
          setTimeout(() => {
            setIsSuccesReg(false);
            setActive(0);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
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
