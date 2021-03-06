import PropTypes from 'prop-types';
import styles from './ProductsItem.module.scss';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToTheCartNotLog, addProductToTheCart} from '../../store/reducers/cartReducer';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {addWishedProduct, removeWishedProduct} from '../../store/reducers/wishlistReducer';
import {showMessage} from '../../store/reducers/messageReducer';
import {ReactComponent as Sale} from './img/sale.svg';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import {useRef} from 'react';

function ProductsItem(props) {
  const {item, isFavorite} = props;
  const {title, imageUrls, previousPrice, currentPrice, itemNo, platform, _id} = item;
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const dispatch = useDispatch();
  const imgErr = useRef(false);
  const isSale = previousPrice !== 0 && previousPrice !== currentPrice;

  const openModal = () => {
    dispatch(openSignModal());
  };

  const addToCart = () => {
    if (isAuthorized) {
      (async () => {
        try {
          await dispatch(addProductToTheCart(_id));
          dispatch(showMessage({text: 'Successfully added to the cart'}));
        } catch (e) {
          dispatch(
            showMessage({text: 'Something went wrong, please try to reload page', type: 'error'}),
          );
        }
      })();
      return;
    }
    const cartItem = {product: item, cartQuantity: 1};
    dispatch(addItemToTheCartNotLog(cartItem));
    dispatch(showMessage({text: 'Successfully added to the cart'}));
  };

  const addToWishlist = () => {
    (async () => {
      try {
        await dispatch(addWishedProduct(_id));
        dispatch(showMessage({text: 'Successfully added to the wishlist'}));
      } catch (e) {
        dispatch(
          showMessage({text: 'Something went wrong, please try to reload page', type: 'error'}),
        );
      }
    })();
  };

  const removeFromWishlist = () => {
    (async () => {
      try {
        await dispatch(removeWishedProduct(_id));
      } catch (e) {
        dispatch(
          showMessage({text: 'Something went wrong, please try to reload page', type: 'error'}),
        );
      }
    })();
  };

  const handleImgError = ({target}) => {
    if (!imgErr.current) {
      target.src = './unknown-w.png';
      imgErr.current = true;
      return;
    }
    target.src = '';
  };

  const bookmarkStyle = {
    color: '#f7d131',
    fontSize: 'xxx-l',
    cursor: 'pointer',
    position: 'absolute',
    top: '-3px',
    right: '10px',
    '&:hover': {transform: 'scale(1.2)'},
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <div>
          {isFavorite ? (
            <BookmarkIcon
              onClick={() => {
                isAuthorized ? removeFromWishlist() : openModal();
              }}
              sx={bookmarkStyle}
            />
          ) : (
            <BookmarkBorderIcon
              onClick={() => {
                isAuthorized ? addToWishlist() : openModal();
              }}
              sx={bookmarkStyle}
            />
          )}
          <Link to={`/details?${itemNo}`}>
            <div className={styles.iconWrapper}>
              <img src={imageUrls[0]} className={styles.img} alt={title} onError={handleImgError} />
            </div>
            <h3 className={styles.productDecription}>{title}</h3>
          </Link>
          <p className={styles.productPlatform}>
            Platform: {Array.isArray(platform) ? platform.join(', ') : platform}
          </p>
        </div>
        <div className={styles.priceWrapper}>
          {isSale ? (
            <div className={styles.priceBox}>
              <Link to={`/details?${itemNo}`}>
                <Sale className={styles.saleSvg} />
              </Link>
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

ProductsItem.propTypes = {
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

export default ProductsItem;
