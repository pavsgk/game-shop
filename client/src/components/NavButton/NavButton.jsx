import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {popHistory} from '../../store/reducers/routerReducer';
import styles from './NavButton.module.scss';

function NavButton({children, direction}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [{length}, {history}] = useSelector(({router}) => [router.history, router]);

  const navTo = async () => {
    if (direction === -1) {
      await dispatch(popHistory());
      if (length > 1) navigate(history[length - 2].pathname + history[length - 2].search);
    } else {
      navigate(direction);
    }
  };

  return (
    <button disabled={length <= 1 && direction === -1} className={styles.btn} onClick={navTo}>
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
