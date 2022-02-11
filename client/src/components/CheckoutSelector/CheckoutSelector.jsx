import styles from './CheckoutSelector.module.scss';
import {useSelector} from 'react-redux';
import {switchTab} from '../../store/reducers/checkoutReducer';
import {useDispatch} from 'react-redux';

function CheckoutSelector({children, tabs}) {
  const checkoutActiveTab = useSelector((store) => store.checkout.checkoutActiveTab);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.checkoutSelector}>
        {tabs.map((tab, index) => (
          <button
            className={checkoutActiveTab === index ? styles.btnCheckoutActive : styles.btnCheckout}
            key={tab}
            onClick={() => {
              dispatch(switchTab(index));
            }}>
            {tab}
          </button>
        ))}
      </div>
      {children[checkoutActiveTab]}
    </>
  );
}

export default CheckoutSelector;
