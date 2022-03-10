import styles from './Header.module.scss';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import {ReactComponent as CartImg} from './img/Frame.svg';
import {ReactComponent as Logo} from './img/star-wars.svg';
import {ReactComponent as MenuImg} from './img/burgermenu.svg';
import {useDispatch, useSelector} from 'react-redux';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import {logout} from '../../store/reducers/userReducer';

function Header() {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(openSignModal());
  };

  const logOut = () => {
    dispatch(logout());
  };

  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu}>
          <MenuImg className={styles.menuImg} onClick={() => setMenuActive(!menuActive)} />
        </div>
        <Link exact="true" to="/">
          <Logo className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <ul
            className={menuActive ? styles.navList : styles.none}
            onClick={() => setMenuActive(false)}>
            <li className={styles.navItem}>
              <Link exact="true" className={styles.navLink} to="/">
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link exact="true" className={styles.navLink} to="/catalog">
                catalog
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link exact="true" className={styles.navLink} to="/wishlist">
                wishlist
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link exact="true" className={styles.navLink} to="/checkout">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.additionalNav}>
          <Link exact="true" className={styles.navLink} to="/admin">
            ~
          </Link>
          <Link exact="true" to="/cart">
            <CartImg className={styles.cartImg} />
          </Link>
          <div className={styles.navLine}> </div>
          {isAuthorized ? (
            <p onClick={() => logOut()} className={styles.logOut}>
              LOG OUT
            </p>
          ) : (
            <p onClick={() => openModal()} className={styles.logIn}>
              LOG IN
            </p>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
