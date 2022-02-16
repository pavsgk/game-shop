import styles from './OrderConfirmed.module.scss';
import successIcon from './success.png';
import {Link} from 'react-router-dom';

function PaymentSuccess() {
  return (
    <div className={styles.OrderConfirmed}>
      <img src={successIcon} alt="Order confirmed" />
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
