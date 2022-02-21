import styles from './ProductCard.module.scss';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addItemToTheCart} from '../../store/reducers/cartReducer';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {addWishedProduct, removeWishedProduct} from '../../store/reducers/wishlistReducer';

function ProductCard(props) {
  const {item, isFavorite} = props;
  const {title, imageUrls, currentPrice, itemNo, platform, _id} = item;
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
        {isFavorite ? (
          <BookmarkIcon
            onClick={() => {
              dispatch(removeWishedProduct(_id));
            }}
            sx={{
              color: '#f7d131',
              fontSize: 'xxx-l',
              cursor: 'pointer',
              position: 'absolute',
              top: '-3px',
              right: '10px',
              '&:hover': {scale: '1.2'},
            }}
          />
        ) : (
          <BookmarkBorderIcon
            onClick={() => {
              dispatch(addWishedProduct(_id));
            }}
            sx={{
              color: '#f7d131',
              fontSize: 'xxx-l',
              cursor: 'pointer',
              position: 'absolute',
              top: '-3px',
              right: '10px',
              '&:hover': {scale: '1.2'},
            }}
          />
        )}
        <Link to={`/details?${itemNo}`}>
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
