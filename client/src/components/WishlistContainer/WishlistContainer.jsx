import styles from './WishlistContainer.module.scss';
import {useSelector} from 'react-redux';
import ProductsItem from '../ProductsItem/ProductsItem';

function WishlistContainer() {
  const {wishlist} = useSelector((state) => state.wishlist);

  return (
    <div className={styles.outWrapper}>
      <div className={styles.container}>
        {wishlist.map((item) => (
          <ProductsItem key={item.itemNo} item={item} isFavorite={true} />
        ))}
      </div>
    </div>
  );
}

export default WishlistContainer;
