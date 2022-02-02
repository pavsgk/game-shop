import {Form, Formik} from 'formik';
import CustomField from '../CustomField/CustomField';
import * as yup from 'yup';
import styles from './SignUp.module.scss';
import AltAuthorization from '../../../../../../AltAuthorization/AltAuthorization';

const SignUp = () => {
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  const yupValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Field is required')
      .min(2, 'min. 2 characters required')
      .matches(/[A-Za-z/s]/),
    surname: yup
      .string()
      .required('Field is required')
      .min(2, 'min. 2 characters required')
      .matches(/[A-Za-z/s]/),
    email: yup.string().required('Field is required').email('Wrong email address entered'),
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
      {(props) => {
        return (
          <>
            <Form className={styles.form}>
              <div className={styles.wrapper}>
                <CustomField name="name" label="Name" type="text" />
                <CustomField name="surname" label="Surname" type="text" />
              </div>
              <CustomField name="email" label="Email" type="text" />
              <CustomField name="password" label="Password" type="password" />
              <button className={styles.submitButton} type="submit">
                Register
              </button>
            </Form>
            <AltAuthorization />
          </>
        );
      }}
    </Formik>
  );
};

export default SignUp;
