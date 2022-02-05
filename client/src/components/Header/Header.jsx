import styles from './Header.module.scss';
import {NavLink, Link} from 'react-router-dom';
import React from 'react';
import {ReactComponent as CartImg} from './img/Frame.svg';
import {ReactComponent as Logo} from './img/star-wars.svg';
import {ReactComponent as MenuImg} from './img/burgermenu.svg';
import {useDispatch} from 'react-redux';
import {openSignModal} from "../../store/reducers/signInUpReducer";

function Header() {

  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(openSignModal())
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu}>
          <MenuImg className={styles.menuImg} />
        </div>
        <Link exact="true" to="/">
          <Logo className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink exact="true" className={styles.navLink} to="/">
                Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink exact="true" className={styles.navLink} to="/catalog">
                catalog
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink exact="true" className={styles.navLink} to="/details">
                details
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink exact="true" className={styles.navLink} to="/wishlist">
                wishlist
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink exact="true" className={styles.navLink} to="/checkout">
                Checkout
              </NavLink>
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
          <p onClick={openModal} className={styles.logIn}>LOG IN</p>
          <p className={styles.logOut}>LOG OUT</p>
        </div>
      </header>
    </>
  );
}

export default Header;
