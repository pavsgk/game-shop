import styles from './PaymentSuccessful.module.scss';
import paymentIcon from './payment.png';
import {Link} from 'react-router-dom';

function PaymentSuccess() {
  return (
    <div className={styles.PaymentSuccessful}>
      <img src={paymentIcon} alt="payment successful" />
      <h2>
        Thank you!
        <br />
        Your purchase is complete.
        <br />
        you will receive a confirmation email shortly.
      </h2>
      <Link to="/">
        <h3>Click here to go back to main page</h3>
      </Link>
    </div>
  );
}

export default PaymentSuccess;
