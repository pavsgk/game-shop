import PropTypes from 'prop-types';
import styles from './ProductCard.module.scss';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToTheCartForNotLog, addProductToTheCart} from '../../store/reducers/cartReducer';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {addWishedProduct, removeWishedProduct} from '../../store/reducers/wishlistReducer';
import {ReactComponent as Sale} from './img/sale.svg';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import {useRef} from 'react';

function ProductCard(props) {
  const {item, isFavorite} = props;
  const {title, imageUrls, previousPrice, currentPrice, itemNo, platform, _id} = item;
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const dispatch = useDispatch();
  const imgErr = useRef(false);

  const openModal = () => {
    dispatch(openSignModal());
  };

  const addToCart = () => {
    if (isAuthorized) {
      dispatch(addProductToTheCart(_id));
      return;
    }
    const cartItem = {product: item, cartQuantity: 1};
    dispatch(addItemToTheCartForNotLog(cartItem));
  };

  const handleImgError = ({target}) => {
    if (!imgErr.current) {
      target.src = './unknown-w.png';
      imgErr.current = true;
      return;
    }
    target.src = '';
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <div>
          {isFavorite ? (
            <BookmarkIcon
              onClick={() => {
                isAuthorized ? dispatch(removeWishedProduct(_id)) : openModal();
              }}
              sx={{
                color: '#f7d131',
                fontSize: 'xxx-l',
                cursor: 'pointer',
                position: 'absolute',
                top: '-3px',
                right: '10px',
                '&:hover': {transform: 'scale(1.2)'},
              }}
            />
          ) : (
            <BookmarkBorderIcon
              onClick={() => {
                isAuthorized ? dispatch(addWishedProduct(_id)) : openModal();
              }}
              sx={{
                color: '#f7d131',
                fontSize: 'xxx-l',
                cursor: 'pointer',
                position: 'absolute',
                top: '-3px',
                right: '10px',
                '&:hover': {transform: 'scale(1.2)'},
              }}
            />
          )}
          <Link to={`/details?${itemNo}`}>
            <div className={styles.iconWrapper}>
              <img
                src={imageUrls[0]}
                alt={title}
                onError={handleImgError}
                height="250"
                width="220"
              />
            </div>
            <h3 className={styles.productDecription}>{title}</h3>
          </Link>
          <p className={styles.productPlatform}>
            Platform: {Array.isArray(platform) ? platform.join(', ') : platform}
          </p>
        </div>

        <div className={styles.priceWrapper}>
          {previousPrice !== 0 && previousPrice !== currentPrice ? (
            <div className={styles.priceBox}>
              <Sale className={styles.saleSvg} />
              <span className={styles.price}>{currentPrice} &#8372;</span>
              <span className={styles.previousPrice}>{previousPrice} &#8372;</span>
            </div>
          ) : (
            <span className={styles.price}>{currentPrice} &#8372;</span>
          )}
          <button onClick={addToCart} className={styles.addButton}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

ProductCard.propTypes = {
  isFavorite: PropTypes.bool,
  item: PropTypes.shape({
    _id: PropTypes.string,
    currentPrice: PropTypes.number,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    itemNo: PropTypes.string,
    platform: PropTypes.arrayOf(PropTypes.string),
    previousPrice: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default ProductCard;
