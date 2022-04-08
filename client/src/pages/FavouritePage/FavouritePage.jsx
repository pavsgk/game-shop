import WishlistContainer from '../../components/WishlistContainer/WishlistContainer';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import {getWishlist} from '../../store/reducers/wishlistReducer';
import Preloader from '../../components/Preloader/Preloader';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';
import styles from '../../components/WishlistContainer/WishlistContainer.module.scss';

function FavouritePage() {
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
          await dispatch(getWishlist());
          setIsBeRequest(true);
          setIsLoading(false);
          setIsError(false);
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
      {isLoading && <Preloader />}
      {isError && <SomethingWentWrong />}
      {wishlist.length < 1 && isBeRequest && (
        <h3 className={styles.noItems}>You dont have any wishlist items</h3>
      )}
      {!isAuthorized && (
        <h3 className={styles.noAuth}>
          {' '}
          If you want to use wishlist you must <span onClick={() => openModal()}>sign in</span>{' '}
        </h3>
      )}
      {isAuthorized && <WishlistContainer />}
    </>
  );
}

export default FavouritePage;
