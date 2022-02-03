import {Form, Formik} from 'formik';
import CustomField from '../CustomField/CustomField';
import * as yup from 'yup';
import styles from './SignIn.module.scss';
import AltAuthorization from '../AltAuthorization/AltAuthorization';

const SignIn = () => {

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  const yupValidationSchema = yup.object().shape({
    email: yup.string().required('Field is required ').email('Wrong email address entered'),
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
              <CustomField name="email" label="Email" type="text" />
              <CustomField name="password" label="Password" type="password" />
              <div className={styles.wrapper}>
                <div className={styles.remindPassword}>Remind password</div>
              </div>
              <button className={styles.submitButton} type="submit">
                Log In
              </button>
            </Form>
            <AltAuthorization />
          </>
        );
      }}
    </Formik>
  );
};

export default SignIn;
