import styles from './Payment.module.scss';
import OrderingComponent from '../OrderingComponent/OrderingComponent';
import Button from '../Button/Button';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updatePaymentInfo} from '../../store/reducers/checkoutReducer';
import {useNavigate} from 'react-router-dom';
import store from '../../store/store';
import {placeOrder} from '../../api/order';

const methods = [
  {
    name: 'Credit Card',
  },
  {
    name: 'Cash on delivery',
  },
];

function Payment() {
  const [{paymentInfo, isValid}, products] = useSelector((store) => [
    store.checkout,
    store.cart.products,
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formDisableTip = () => {
    const tip = [];
    if (!isValid) tip.push('Invalid shipping info');
    if (products.length === 0) tip.push('Cart is empty');
    return tip.length > 1 ? tip.join(', ') : tip.join('');
  };

  const handleSubmit = async () => {
    const {user, cart, checkout} = store.getState();
    const {country, city, address, postal} = checkout.checkoutFields;
    const {
      shippingPrice,
      shippingMethod,
      paymentInfo,
      checkoutFields: {mobile},
    } = checkout;
    const email = checkout.checkoutFields.email || user.userData.email;

    const orderBody = {
      products: cart.products,
      deliveryAddress: {
        country,
        city,
        address,
        postal,
      },
      shipping: {
        shippingPrice,
        shippingMethod,
      },
      paymentInfo,
      email,
      mobile,
      letterSubject: 'Thank you for order! You are welcome!',
      letterHtml: '<h1>Your order is placed!</h1><p>Manager will contact you soon</p>',
    };
    if (user.isAuthorized) orderBody.customerId = user.userData.customerId;

    try {
      await placeOrder(orderBody);
      navigate('/orderConfirmed');
    } catch {
      navigate('/error');
    }
  };

  return (
    <div className={styles.payment}>
      {methods.map(({name}) => (
        <React.Fragment key={name}>
          <input
            onChange={() => dispatch(updatePaymentInfo(name))}
            checked={name === paymentInfo}
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
          disabled={!products.length || !isValid}
          onClick={handleSubmit}
          data-dis-tip={formDisableTip()}>
          submit order
        </Button>
      </div>
    </div>
  );
}

export default Payment;
