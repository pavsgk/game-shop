import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './WishlistContainer.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import {getWishlist} from '../../store/reducers/wishlistReducer';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import Preloader from '../Preloader/Preloader';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';

function WishlistContainer() {
  const {wishlist} = useSelector((state) => state.wishlist);

  return (
    <div className={styles.outWrapper}>
      <div className={styles.container}>
        {wishlist.map((item) => (
          <ProductCard key={item.itemNo} item={item} isFavorite={true} />
        ))}
      </div>
    </div>
  );
}

export default WishlistContainer;
