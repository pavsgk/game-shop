import styles from './WishlistContainer.module.scss';
import {useSelector} from 'react-redux';
import ProductsItem from '../ProductsItem/ProductsItem';

function WishlistContainer() {
  const {wishlist} = useSelector((state) => state.wishlist);
  const wishlistContent = wishlist.map((item) => (
    <ProductsItem key={item.itemNo} item={item} isFavorite={true} />
  ));

  return (
    <div className={styles.outWrapper}>
      <div className={styles.container}>{wishlistContent}</div>
    </div>
  );
}

export default WishlistContainer;
