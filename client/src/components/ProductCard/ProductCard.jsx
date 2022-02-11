import styles from './ProductCard.module.scss';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToTheCart} from '../../store/reducers/cartReducer';

function ProductCard(props) {
  const {item} = props;
  const {title, imageUrls, currentPrice, itemNo} = item;

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItemToTheCart(item));
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <Link to={'/details'} onClick={() => localStorage.setItem('currentItem', itemNo)}>
          <div className={styles.iconWrapper}>
            <img src={imageUrls[0]} alt={title} height="250" width="220" />
          </div>
          <h3 className={styles.productDecription}>{title}</h3>
        </Link>
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
