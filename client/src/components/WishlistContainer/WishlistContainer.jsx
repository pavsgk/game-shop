import styles from './WishlistContainer.module.scss';
import {useSelector} from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';

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
