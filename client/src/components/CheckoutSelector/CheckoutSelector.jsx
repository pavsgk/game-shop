import PropTypes from 'prop-types';
import styles from './CheckoutSelector.module.scss';
import {useSelector} from 'react-redux';
import {switchTab} from '../../store/reducers/checkoutReducer';
import {useDispatch} from 'react-redux';

function CheckoutSelector({children, tabs}) {
  const checkoutActiveTab = useSelector((store) => store.checkout.checkoutActiveTab);
  const dispatch = useDispatch();
  const tabsItems = tabs.map((tab, index) => (
    <button
      className={checkoutActiveTab === index ? styles.btnCheckoutActive : styles.btnCheckout}
      key={tab}
      onClick={() => {
        dispatch(switchTab(index));
      }}>
      {tab}
    </button>
  ));

  return (
    <>
      <div className={styles.checkoutSelector}>{tabsItems}</div>
      {children[checkoutActiveTab]}
    </>
  );
}

CheckoutSelector.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CheckoutSelector;
