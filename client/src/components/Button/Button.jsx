import styles from './Button.module.scss';
import PropTypes from 'prop-types';

function Button(props) {
  const {children, type} = props;
  return (
    <button className={styles.btn} {...props} type={type}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
