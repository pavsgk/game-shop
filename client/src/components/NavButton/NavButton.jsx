import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import styles from './NavButton.module.scss';

function NavButton({children, direction}) {
  const navigate = useNavigate();

  const navTo = () => navigate(direction);

  return (
    <button className={styles.btn} onClick={navTo}>
      {children}
    </button>
  );
}

NavButton.propTypes = {
  direction: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

NavButton.defaultProps = {
  direction: -1,
  children: <>&#60;</>,
};

export default NavButton;
