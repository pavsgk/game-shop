import styles from './ProductCard.module.scss';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToTheCart} from '../../store/reducers/cartReducer';
import {useEffect} from 'react';

function ProductCard(props) {
  const {item} = props;
  const {title, imageUrls, currentPrice, itemNo, platform} = item;

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItemToTheCart(item));
  };

  // const checkPlatform = () => {
  //   if (Array.isArray(platform)) {
  //     return platform.join(", ");
  //   }
  // }

  return (
    <>
      <div className={styles.cardContainer}>
        <Link to={'/details'} onClick={() => localStorage.setItem('currentItem', itemNo)}>
          <div className={styles.iconWrapper}>
            <img src={imageUrls[0]} alt={title} height="250" width="220" />
          </div>
          <h3 className={styles.productDecription}>{title}</h3>
        </Link>
        <p className={styles.productPlatform}>
          Platform: {Array.isArray(platform) ? platform.join(', ') : platform}
        </p>
        <div className={styles.priceWrapper}>
          <span className={styles.price}>&#8372; {currentPrice}</span>
          <button onClick={addToCart} className={styles.addButton}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
