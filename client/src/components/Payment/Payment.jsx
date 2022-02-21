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
  const [paymentInfo, products] = useSelector((store) => [
    store.checkout.paymentInfo,
    store.cart.products,
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const {user, cart, checkout} = store.getState();
    const {country, city, address, postal} = checkout.checkoutFields;
    const {
      shippingPrice,
      shippingMethod,
      paymentInfo,
      checkoutFields: {mobile},
    } = checkout;
    const email = user.userData.email || checkout.checkoutFields.email;

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

    console.log(orderBody);
    try {
      console.log(await placeOrder(orderBody));
      navigate('orderConfirmed');
    } catch {
      navigate('error');
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
          disabled={!products.length}
          onClick={handleSubmit}
          data-dis-tip={!products.length ? 'Cart is empty' : undefined}>
          submit order
        </Button>
      </div>
    </div>
  );
}

export default Payment;
