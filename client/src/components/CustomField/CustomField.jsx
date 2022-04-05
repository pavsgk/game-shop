import PropTypes from 'prop-types';
import {Field, useField} from 'formik';
import styles from './CustomField.module.scss';

function CustomField(props) {
  const [field, meta] = useField(props);
  const {label, type} = props;
  const isError = meta.error && meta.touched;

  return (
    <div className={styles.customField}>
      <span className={styles.label}>{field.value ? label : '\u00A0'}</span>
      <Field
        {...field}
        className={isError ? styles.err : undefined}
        placeholder={label}
        // onChange={(event) => field.onChange(event)}
        label={label}
        type={type}
      />
      <span className={styles.errLabel}>{isError ? meta.error : '\u00A0'}</span>
    </div>
  );
}

CustomField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};

CustomField.defaultProps = {
  label: '',
  type: 'text',
};

export default CustomField;
