import styles from './EmptyCart.module.scss';
import {ReactComponent as CartPic} from '../../assets/svg/cart.svg';
import {Link} from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <CartPic className={styles.logoImg} />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>Your cart is empty</h2>
        <Link to="/catalog">
          <h3 className={styles.link}>Keep shopping</h3>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
