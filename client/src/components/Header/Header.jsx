import styles from './Header.module.scss';
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {ReactComponent as CartImg} from './img/Frame.svg';
import {ReactComponent as Logo} from './img/star-wars.svg';
import {ReactComponent as Search} from './img/search.svg';
import {ReactComponent as MenuImg} from './img/burgermenu.svg';
import {useDispatch, useSelector} from 'react-redux';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import {logout} from '../../store/reducers/userReducer';
import {countCartQuantity, countCartSum, getCartFromLS} from '../../store/reducers/cartReducer';
import {saveToLS} from '../../utils/localStorage';
import SearchBar from '../SearchBar/SearchBar';
import OutsideTracker from '../OutsideTracker/OutsideTracker';
import NavButton from '../NavButton/NavButton';
import {ReactComponent as User} from '../Footer/img/user.svg';

function Header() {
  const dispatch = useDispatch();

  const handleAuthorization = () => {
    dispatch(openSignModal());
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
  }, [cart]);

  useEffect(() => {
    isAuthorized && saveToLS('cart', cart);
  }, [isAuthorized, cart]);

  useEffect(() => {
    dispatch(getCartFromLS());
  }, []);

  const [menuActive, setMenuActive] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const searchBarMobile = (
    <OutsideTracker func={() => setMobileSearch(false)}>
      <div className={styles.mobileSearch}>
        <SearchBar />
      </div>
    </OutsideTracker>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menuBox}>
          <div className={styles.menu}>
            <MenuImg className={styles.menuImg} onClick={() => setMenuActive(!menuActive)} />
          </div>
          <div
            className={styles.searchWrapper}
            onClick={() => {
              setMobileSearch(!mobileSearch);
            }}>
            <div className={styles.navLine}> </div>
            <Search className={styles.searchImg} />
          </div>
          {mobileSearch ? searchBarMobile : null}
        </div>
        <Link exact="true" to="/">
          <Logo className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <OutsideTracker func={() => setMenuActive(false)}>
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
                    <div className={styles.wishlistQuantity}>{wishlist.length}</div>
                  )}
                </Link>
              </li>
              <li className={styles.searchDesktop}>{mobileSearch || <SearchBar />}</li>
            </ul>
          </OutsideTracker>
        </nav>
        <div className={styles.additionalNav}>
          <Link exact="true" to="/cart">
            <CartImg className={styles.cartImg} />
            {cartQuantity > 0 && <div className={styles.cartQuantity}>{cartQuantity}</div>}
          </Link>
          <div className={styles.navLine} />
          {isAuthorized ? (
            <Link exact="true" className={styles.userPic} to="/user">
              <User />
            </Link>
          ) : (
            <div onClick={() => handleAuthorization()} className={styles.logIn}>
              Log in
            </div>
          )}
        </div>
      </header>
      <div className={styles.dummy} />
    </>
  );
}

export default Header;
