import styles from './Payment.module.scss';
import OrderingComponent from '../OrderingComponent/OrderingComponent';
import Button from '../Button/Button';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updatePaymentMethod} from '../../store/reducers/checkoutReducer';
import {useNavigate} from 'react-router-dom';

const methods = [
  {
    name: 'Credit Card',
  },
  {
    name: 'Cash on delivery',
  },
];

function Payment() {
  const [paymentMethod, cartItems] = useSelector((store) => [
    store.checkout.paymentMethod,
    store.cart.cartItems,
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.payment}>
      {methods.map(({name}) => (
        <React.Fragment key={name}>
          <input
            onChange={() => dispatch(updatePaymentMethod(name))}
            checked={name === paymentMethod}
            type="radio"
            id={name}
            value={name}
          />
          <label htmlFor={name}>
            <OrderingComponent name={name} />
          </label>
        </React.Fragment>
      ))}
      <div className={styles.submit}>
        <Button
          disabled={!cartItems.length}
          onClick={() => navigate('/orderConfirmed')}
          data-dis-tip={!cartItems.length ? 'Cart is empty' : undefined}>
          submit order
        </Button>
      </div>
    </div>
  );
}

export default Payment;
