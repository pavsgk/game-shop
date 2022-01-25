import {TextField} from '@mui/material';
import {border, style} from '@mui/system';
import {useField} from 'formik';
import styles from './CustomField.module.scss';

function CustomField(props) {
  const [field, meta, helpers] = useField(props);
  const {label, type, customChange} = props;
  const isError = meta.touched && meta.error;

  return (
    <>
      <TextField
        {...field}
        onChange={(event) => field.onChange(event)}
        label={label}
        type={type}
        className={style.field}
      />
      <span className={styles.error}>{isError ? meta.error : '\u00A0'}</span>
    </>
  );
}

export default CustomField;
