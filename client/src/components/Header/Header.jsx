import {Link} from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  return (
    <>
      <header className={styles.Header}>
        <Link to="/">Main</Link>
        <Link to="/filter">Filter</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/details">Details</Link>
        <Link to="/checkout">Checkout</Link>
      </header>
      <div className={styles.HeaderDummy} />
    </>
  );
}

export default Header;
