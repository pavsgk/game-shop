import {TextField} from '@mui/material';
import {styled} from '@mui/material/styles';
// import {border, style} from '@mui/system';
import {useField} from 'formik';
// import styles from './CustomField.module.scss';

const ValidationTextField = styled(TextField)({
  '& input': {
    color: '#ffffff',
  },
  '& input:invalid:hover + fieldset': {
    borderColor: '#ffffff',
  },
  '& input:valid + fieldset': {
    borderColor: '#ffc500',
    borderWidth: 1,
    borderRadius: 0,
    color: '#ffffff',
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
});

function CustomField(props) {
  const [field, meta, helpers] = useField(props);
  const {label, type, customChange} = props;
  const isError = meta.touched && meta.error;

  return (
    <>
      <ValidationTextField
        {...field}
        error={isError}
        onChange={(event) => field.onChange(event)}
        label={label}
        type={type}
        color="secondary"
        helperText={isError ? meta.error : ''}
      />
    </>
  );
}

export default CustomField;
