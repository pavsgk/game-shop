import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './WishlistContainer.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import {getWishlist} from '../../store/reducers/wishlistReducer';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import Preloader from '../Preloader/Preloader';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';

function WishlistContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isBeRequest, setIsBeRequest] = useState(false);
  const {wishlist} = useSelector((state) => state.wishlist);
  const {isAuthorized} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(openSignModal());
  };

  useEffect(() => {
    setIsBeRequest(false);
    if (isAuthorized) {
      (async () => {
        try {
          setIsLoading(true);
          const result = await dispatch(getWishlist());
          setIsBeRequest(true);
          console.log(result);
          setIsLoading(false);
        } catch (e) {
          console.warn(e);
          setIsLoading(false);
          setIsError(true);
        }
      })();
    }
  }, [isAuthorized]);

  return (
    <>
      <div className={styles.outWrapper}>
        <div className={styles.container}>
          {isAuthorized &&
            wishlist.map((item) => <ProductCard key={item.itemNo} item={item} isFavorite={true} />)}
        </div>
        {isLoading && <Preloader />}
        {isError && <SomethingWentWrong />}
        {wishlist.length < 1 && isBeRequest && (
          <h3 className={styles.noItems}>You dont have any wishlist items</h3>
        )}
        {!isAuthorized && (
          <h3 className={styles.noAuth}>
            {' '}
            If you want to use wishlist you must <span onClick={() => openModal()}>
              sign in
            </span>{' '}
          </h3>
        )}
      </div>
    </>
  );
}

export default WishlistContainer;
