import styles from './Header.module.scss';
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {ReactComponent as CartImg} from './img/Frame.svg';
import {ReactComponent as Logo} from './img/star-wars.svg';
import {ReactComponent as MenuImg} from './img/burgermenu.svg';
import {useDispatch, useSelector} from 'react-redux';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import {logout} from '../../store/reducers/userReducer';
import {
  countCartQuantity,
  countCartSum,
  getCartFromLS,
  getCartFromServer,
  updateCartFromLs,
} from '../../store/reducers/cartReducer';
import {removeFromLS, saveToLS} from '../../utils/localStorage';

function Header() {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(openSignModal());
  };

  const logOut = () => {
    dispatch(logout());
  };

  const [cart, isAuthorized, cartQuantity] = useSelector((state) => [
    state.cart.products,
    state.user.isAuthorized,
    state.cart.cartQuantity,
  ]);
  const {wishlist} = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(countCartSum());
    dispatch(countCartQuantity());
  }, [cart, dispatch, isAuthorized]);

  useEffect(() => {
    isAuthorized && saveToLS('cart', cart);
  }, [cart]);

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
              <Link exact="true" className={styles.navLink} to="/sale">
                sale
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link exact="true" className={styles.navLink} to="/wishlist">
                wishlist
                {wishlist.length > 0 && isAuthorized && (
                  <div className={styles.wishlistQuantityWrapper}>{wishlist.length}</div>
                )}
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
            {cartQuantity > 0 && <div className={styles.cartQuantityWrapper}>{cartQuantity}</div>}
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
      <div className={styles.dummy}></div>
    </>
  );
}

export default Header;
